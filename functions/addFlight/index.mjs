import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../services/db.mjs";

const addFlight = async (event) => {
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

  const newFlight = {
    id: `f${crypto.randomUUID().slice(0, 5)}`,
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    date,
    airline,
    price,
  };

  await db.send(
    new PutCommand({
      TableName: "flights-db",
      Item: newFlight
    })
  )

  return sendResponse(201, { flight: newFlight });
};

export const handler = middy(addFlight)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler());
