import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { flights } from "../../data/index.mjs";

const deleteFlight = async (event) => {
  const { id } = event.pathParameters;

  const index = flights.findIndex((f) => f.id === id);

  if (index === -1) {
    throw createError(404, `Flight not found`);
  }

  const deletedFlight = flights.splice(index, 1)[0];

  return sendResponse(200, { flight: deletedFlight });
};

export const handler = middy(deleteFlight).use(httpErrorHandler());
