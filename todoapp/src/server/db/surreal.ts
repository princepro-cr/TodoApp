import { Surreal } from 'surrealdb';

/*const db = new Surreal("http://127.0.0.1:8000/rpc");*/
const db = new Surreal();

export const connectToSurrealDB = async () => {
  try {
    await db.signin({
      user: "root",
      pass: "root",
    });

    await db.use("namespace", "database");
    console.log("Connected to SurrealDB");
  } catch (error) {
    console.error("Failed to connect to SurrealDB", error);
    throw new Error("SurrealDB connection failed");
  }
};

export { db };
