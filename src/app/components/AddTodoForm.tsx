import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, TodoFormData } from "@/schemas/todoSchema";
import { trpc } from "@/utils/trpc";

const AddTodoForm: React.FC = () => {
    // Initialize the form with zodResolver
    const { register, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
      resolver: zodResolver(todoSchema),
    });
  
    // Mutation for adding a todo
    const mutation = trpc.addTodo.useMutation();
  
    const onSubmit = (data: TodoFormData) => {
      mutation.mutate(data, {
        onSuccess: () => {
          alert("Todo added successfully!");
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      });
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            {...register("title")}
            id="title"
            className="border rounded px-2 py-1 w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
  
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            id="description"
            className="border rounded px-2 py-1 w-full"
          />
        </div>
  
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            id="startDate"
            className="border rounded px-2 py-1 w-full"
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
        </div>
  
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            {...register("endDate")}
            id="endDate"
            className="border rounded px-2 py-1 w-full"
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
        </div>
  
        <div>
          <label htmlFor="status" className="block text-sm font-medium">Status</label>
          <select
            {...register("status")}
            id="status"
            className="border rounded px-2 py-1 w-full"
          >
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="overdue">Overdue</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
    );
  };
  
  export default AddTodoForm;
  