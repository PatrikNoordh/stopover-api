import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../services/db.mjs";

const getFlights = async (event) => {
  const { from, to, maxPrice } = event.queryStringParameters ?? {};

  if (maxPrice !== undefined && isNaN(Number(maxPrice))) {
    throw createError(400, "maxPrice must be a number");
  }

  const { Items } = await db.send(
    new ScanCommand({
      TableName: "flights-db",
    }),
  );

  let result = Items.sort((a, b) => a.date.localeCompare(b.date));

  if (from) {
    result = result.filter((f) => f.from === from.toUpperCase());
  }

  if (to) {
    result = result.filter((f) => f.to === to.toUpperCase());
  }

  if (maxPrice) {
    result = result.filter((f) => f.price <= Number(maxPrice));
  }

  return sendResponse(200, { flights: result });
};

export const handler = middy(getFlights).use(httpErrorHandler());
