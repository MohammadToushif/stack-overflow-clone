import { databases } from "./config";
import { CONST } from "../constants";
import { IndexType, Permission } from "node-appwrite";

export default async function createQuestionCollection() {
  // Create the question collection
  await databases.createCollection(
    CONST.db,
    CONST.questionCollection,
    CONST.questionCollection,
    [
      Permission.read("any"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log(`Collection ${CONST.questionCollection} created successfully`);

  //  Create attributes for the question collection
  await Promise.all([
    databases.createStringAttribute(
      CONST.db,
      CONST.questionCollection,
      "title",
      255,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.questionCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.questionCollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.questionCollection,
      "tags",
      50,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.questionCollection,
      "attachmentId",
      50,
      false
    ),
  ]);

  console.log(
    `Attributes for ${CONST.questionCollection} created successfully`
  );

  //   Create indexes for the question collection
  await Promise.all([
    databases.createIndex(
      CONST.db,
      CONST.questionCollection,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
    databases.createIndex(
      CONST.db,
      CONST.questionCollection,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"]
    ),
  ]);
}
