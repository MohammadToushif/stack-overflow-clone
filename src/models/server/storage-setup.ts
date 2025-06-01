import { Permission } from "node-appwrite";
import { CONST } from "../constants";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    // Check if the storage bucket exists
    await storage.getBucket(CONST.questionAttachmentBucket);
    console.log(
      `Storage bucket ${CONST.questionAttachmentBucket} already exists.`
    );
  } catch (error) {
    console.error(`${error instanceof Error ? error.message : error}`);

    // If the storage bucket does not exist, create it
    try {
      await storage.createBucket(
        CONST.questionAttachmentBucket,
        CONST.questionAttachmentBucket,
        [
          Permission.read("any"),
          Permission.create("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ]
      );
      console.log(
        `Storage bucket ${CONST.questionAttachmentBucket} created successfully.`
      );
    } catch (error) {
      console.error(
        `Failed to create storage bucket ${CONST.questionAttachmentBucket}: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  }

  return storage;
}
