import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { getFlightById } from "../../services/flights.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;

  const flight = await getFlightById(id);

  if (!flight) {
    throw createError(404, `Flight with id ${id} not found`);
  }

  return sendResponse(200, { flight });
}).use(httpErrorHandler());
