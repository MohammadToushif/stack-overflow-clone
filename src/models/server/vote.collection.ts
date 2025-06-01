import { databases } from "./config";
import { CONST } from "../constants";
import { Permission } from "node-appwrite";

export default async function createVoteCollection() {
  // Create the vote collection
  await databases.createCollection(
    CONST.db,
    CONST.voteCollection,
    CONST.voteCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log(`Collection ${CONST.voteCollection} created successfully`);

  // Create attributes for the vote collection
  await Promise.all([
    databases.createEnumAttribute(
      CONST.db,
      CONST.voteCollection,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createEnumAttribute(
      CONST.db,
      CONST.voteCollection,
      "voteStatus",
      ["upvote", "downvote"],
      true
    ),
    databases.createStringAttribute(
      CONST.db,
      CONST.voteCollection,
      "voteById",
      50,
      true
    ),
  ]);

  console.log(
    `Attributes for collection ${CONST.voteCollection} created successfully`
  );
}
