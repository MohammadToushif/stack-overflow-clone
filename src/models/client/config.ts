import { Client, Account, Databases, Avatars, Storage } from "appwrite";
import { env } from "@/env";

const client = new Client();

client.setEndpoint(env.appwrite.endpoint).setProject(env.appwrite.projectId);

const databases = new Databases(client);
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

// export { ID } from "appwrite";
export { databases, account, avatars, storage };
