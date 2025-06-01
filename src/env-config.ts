const env = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    keySecret: String(process.env.NEXT_APPWRITE_API_KEY_SECRET),
  },
};

export { env };
