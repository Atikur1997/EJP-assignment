import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

// Singleton MongoClient
let client =
  global._mongoClient ||
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

if (!global._mongoClient) global._mongoClient = client;

// Get the database
async function getDB(dbName = "EJP-Assignment") {
  await client.connect(); // safe to call multiple times
  return client.db(dbName);
}

// Get a collection by name
async function getCollection(name, dbName = "EJP-Assignment") {
  const db = await getDB(dbName);
  return db.collection(name);
}

// Export collections as a single object
export const collections = {
  users: async () => getCollection("users"),
  cars: async () => getCollection("cars"),
};
