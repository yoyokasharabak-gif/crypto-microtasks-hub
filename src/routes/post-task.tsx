import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/post-task")({
  head: () => ({
    meta: [
      { title: "Post a Task — McKWork" },
      { name: "description", content: "Publish a microtask to a global community of verified workers. Pay in SOL or USDC." },
    ],
  }),
  component: PostTaskPage,
});

function PostTaskPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 py-20">
        <p className="label-classic text-gold">Step 01 of 07</p>
        <h1 className="serif text-5xl mt-4">Publish a task</h1>
        <p className="accent-italic mt-4 text-xl text-silver max-w-2xl">
          A measured, seven-step process to bring your work to a global community of verified workers.
        </p>
        <div className="card-classic rounded-md p-10 mt-10 max-w-2xl">
          <p className="text-silver">The post-a-task wizard will appear here. (Coming next.)</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
