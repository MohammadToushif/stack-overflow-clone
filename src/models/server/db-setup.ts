import { databases } from "./config";
import { CONST } from "../constants";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDatabase() {
  try {
    // Check if the database exists
    await databases.get(CONST.db);
    console.log(`Database ${CONST.db} already exists, and now connected.`);
  } catch (error) {
    console.error(`${error instanceof Error ? error.message : error}`);

    // If the database does not exist, create it
    try {
      await databases.create(CONST.db, CONST.db);
      console.log(`Database ${CONST.db} created successfully.`);
      // Create the question collection if the database was created
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);

      console.log(`All collections created successfully in ${CONST.db}.`);

    } catch (error) {
      console.error(
        `Failed to create database ${CONST.db}: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  return databases;
}
