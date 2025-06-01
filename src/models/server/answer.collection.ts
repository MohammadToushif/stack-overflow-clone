import { databases } from "./config";
import { CONST } from "../constants";
import { Permission } from "node-appwrite";

export default async function createAnswerCollection() {
  // Create the answer collection
  await databases.createCollection(
    CONST.db,
    CONST.answerCollection,
    CONST.answerCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log(`Collection ${CONST.answerCollection} created successfully`);

  // Create attributes for the answer collection
  await Promise.all([
    databases.createStringAttribute(
      CONST.db,
      CONST.answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.answerCollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.answerCollection,
      "questionId",
      50,
      true
    ),
  ]);

  console.log(
    `Attributes for collection ${CONST.answerCollection} created successfully`
  );

}
