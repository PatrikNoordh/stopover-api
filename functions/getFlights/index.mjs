import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { getAllFlights } from "../../services/flights.mjs";

export const handler = middy(async (event) => {
  const { from, to, maxprice } = event.queryStringParameters ?? {};

  if (maxprice !== undefined && isNaN(Number(maxprice))) {
    throw createError(400, "maxprice must be a number");
  }

  const flights = await getAllFlights();

  let result = flights.sort((a, b) => a.date.localeCompare(b.date));

  if (from) result = result.filter((f) => f.from === from.toUpperCase());
  if (to) result = result.filter((f) => f.to === to.toUpperCase());
  if (maxprice) result = result.filter((f) => f.price <= Number(maxprice));

  return sendResponse(200, { flights: result });
}).use(httpErrorHandler());
