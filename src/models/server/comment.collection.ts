import { databases } from "./config";
import { CONST } from "../constants";
import { Permission } from "node-appwrite";

export default async function createCommentCollection() {
  // Create the comment collection
  await databases.createCollection(
    CONST.db,
    CONST.commentCollection,
    CONST.commentCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log(`Collection ${CONST.commentCollection} created successfully`);

  // Create attributes for the comment collection
  await Promise.all([
    databases.createStringAttribute(
      CONST.db,
      CONST.commentCollection,
      "content",
      10000,
      true
    ),
    databases.createEnumAttribute(
      CONST.db,
      CONST.commentCollection,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.commentCollection,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.commentCollection,
      "questionId",
      50,
      true
    ),
  ]);

}
