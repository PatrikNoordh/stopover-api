import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { flights } from "../../data/index.mjs";

const updateFlight = async (event) => {
  const { id } = event.pathParameters;
  const { from, to, date, airline, price } = event.body ?? {};

  if (
    typeof from != "string" ||
    typeof to != "string" ||
    typeof date != "string" ||
    typeof airline != "string" ||
    typeof price != "number"
  ) {
    throw createError(
      400,
      "from, to, date and airline must be strings, price must be a number",
    );
  }

  const index = flights.findIndex((f) => f.id === id);

  if (index === -1) {
    throw createError(404, `Flight not found`);
  }
  const updatedFlight = {
    id,
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    date,
    airline,
    price,
  };

  flights[index] = updatedFlight;

  return sendResponse(200, { flight: updatedFlight });
};

export const handler = middy(updateFlight)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());
