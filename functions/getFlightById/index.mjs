import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { flights } from "../../data/index.mjs";

const getFlightById = async (event) => {
  const { id } = event.pathParameters;

  const flight = flights.find((f) => f.id === id);

  if (!flight) {
    throw createError(404, `Flight not found`);
  }

  return sendResponse(200, { flight });
};

export const handler = middy(getFlightById).use(httpErrorHandler());
