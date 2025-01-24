import AddTodoForm from "@/components/AddTodoForm";

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add a New Todo</h1>
      <AddTodoForm />
    </main>
  );
}
