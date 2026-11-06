import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { updateFlight } from "../../services/flights.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;

  const { from, to, date, airline, price } = event.body ?? {};

  if (
    typeof from !== "string" ||
    typeof to !== "string" ||
    typeof date !== "string" ||
    typeof airline !== "string" ||
    typeof price !== "number"
  ) {
    throw createError(
      400,
      "from, to, date and airline must be strings, price must be a number",
    );
  }

  const flight = await updateFlight(id, {
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    date,
    airline,
    price,
  });

  return sendResponse(200, { flight });
})
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());
