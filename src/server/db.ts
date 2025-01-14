import Surreal from "surrealdb.js";

const db = new Surreal("wss://todoappdb-06a60g32ulstd6htvqiaj0grmc.aws-use1.surreal.cloud");

export async function connectDB() {
  await db.connect({
    namespace: "todons",
    database: "tododb",
    auth: {
      username: "root22",
      password: "root22",
    },
  });
}

export { db };
