import { db } from "./db.mjs";

import {
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { createError } from "@middy/util";

const TABLE_NAME = "flights-db";

export const getAllFlights = async () => {
  try {
    const { Items } = await db.send(new ScanCommand({ TableName: TABLE_NAME }));
    return Items;
  } catch (error) {
    console.error("ERROR getAllFlights:", error);
    throw createError(500, "Could not fetch flights");
  }
};

export const getFlightById = async (id) => {
  try {
    const { Item } = await db.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { id } }),
    );
    return Item;
  } catch (error) {
    console.error("ERROR getFlightById:", error);
    throw createError(500, "Could not fetch flight");
  }
};

export const addFlight = async (flight) => {
  try {
    await db.send(new PutCommand({ TableName: TABLE_NAME, Item: flight }));
    return flight;
  } catch (error) {
    console.error("ERROR addFlight:", error);
    throw createError(500, "Could not add flight");
  }
};

export const updateFlight = async (id, { from, to, date, airline, price }) => {
  try {
    const { Attributes } = await db.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression:
          "set #from = :from, #to = :to, #date = :date, #airline = :airline, #price = :price",
        ExpressionAttributeNames: {
          "#from": "from",
          "#to": "to",
          "#date": "date",
          "#airline": "airline",
          "#price": "price",
        },
        ExpressionAttributeValues: {
          ":from": from,
          ":to": to,
          ":date": date,
          ":airline": airline,
          ":price": price,
        },
        ConditionExpression: "attribute_exists(id)",
        ReturnValues: "ALL_NEW",
      }),
    );
    return Attributes;
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      throw createError(404, "Flight not found");
    }
    console.error("ERROR updateFlight:", error);
    throw createError(500, "Could not update flight");
  }
};

export const deleteFlight = async (id) => {
    try {
        const { Attributes } = await db.send(
            new DeleteCommand({
                TableName: TABLE_NAME,
                Key: { id },
                ReturnValues: "ALL_OLD",
            })
        )
        return Attributes;
    } catch (error) {
        console.error("ERROR deleteFlight:", error);
        throw createError(500, "Could not delete flight");
    }
}
