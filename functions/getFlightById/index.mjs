import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import { createError } from "@middy/util";
import { sendResponse } from "../../responses/index.mjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../services/db.mjs";

const getFlightById = async (event) => {
  const { id } = event.pathParameters;

  const { Item } = await db.send(
    new GetCommand({
      TableName: "flights-db",
      Key: { id },
    }),
  );

  if (!Item) {
    throw createError(404, `Flight not found`);
  }

  return sendResponse(200, { flight: Item });
};

export const handler = middy(getFlightById).use(httpErrorHandler());
