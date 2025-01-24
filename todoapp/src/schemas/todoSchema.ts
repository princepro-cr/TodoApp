import { z } from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["completed", "pending", "active", "overdue"]),
});

export type TodoFormData = z.infer<typeof todoSchema>;  
