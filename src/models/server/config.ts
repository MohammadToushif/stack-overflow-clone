import { Client, Databases, Avatars, Storage, Users } from "node-appwrite";
import { env } from "@/env-config";

const client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.keySecret);

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { databases, avatars, storage, users };
