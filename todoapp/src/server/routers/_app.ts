import { z } from "zod";
import { procedure, router } from "../trpc";
import { db } from "../db/surreal";

export const todoRouter = router({
  create: procedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
        status: z.enum(["completed", "pending", "active", "overdue"]),
      })
    )
    .mutation(async ({ input }) => {
      const createdAt = new Date();
      const updatedAt = createdAt;

      return await db.query(
        `INSERT INTO todos SET $input RETURNING *`,
        { ...input, _createdAt: createdAt, _updatedAt: updatedAt }
      );
    }),

  getAll: procedure.query(async () => {
    return await db.query(`SELECT * FROM todos`);
  }),

  update: procedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        status: z.enum(["completed", "pending", "active", "overdue"]),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const updatedAt = new Date();

      return await db.query(
        `UPDATE todos SET $updates, _updatedAt = $updatedAt WHERE id = $id RETURNING *`,
        { updates, updatedAt, id }
      );
    }),

  delete: procedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      return await db.query(`DELETE FROM todos WHERE id = $id`, { id });
    }),
});

export const appRouter = router({
  todos: todoRouter,
});

export type AppRouter = typeof appRouter;
