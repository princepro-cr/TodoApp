import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { inferAsyncReturnType } from "@trpc/server";
import { connectToSurrealDB, db } from "./db/surreal";
 

const t = initTRPC.create();
export const router = t.router;
export const procedure = t.procedure;

export const appRouter = t.router({
  getTodos: t.procedure.query(() => {
    // Fetch todos from SurrealDB
  }),
  addTodo: t.procedure.input(
    z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      startDate: z.date(),
      endDate: z.date(),
      status: z.enum(["completed", "pending", "active", "overdue"]),
    })
  ).mutation(async ({ input }) => {
    // Add a todo to SurrealDB
  }),
});

export const handler = createNextApiHandler({ router: appRouter });

export const createTRPCContext = async () => {
  // Ensure SurrealDB is connected
  await connectToSurrealDB();

  return {
    db,
  };
};

export type TRPCContext = inferAsyncReturnType<typeof createTRPCContext>;
