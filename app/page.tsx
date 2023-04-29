import { BsCalendarCheck, BsGithub } from "react-icons/bs";
import { use } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import TitleForm from "../components/forms/titleForm";
import TodoItem from "../components/todoItem";
import { TodoClient } from "../types";
import { Button } from "../components/buttons";
import { getProviders, signIn } from "next-auth/react";
import { SignInForm } from "../components/forms/signInForm";
import { redirect } from "next/navigation";

type Todo = {
  id: string;
  title: string;
  notes?: string | null;
  createdAt: Date;
  dueDate?: Date | null;
  complete: boolean;
};

function transformTodos(todos: Todo[]): TodoClient[] {
  if (todos) {
    todos.map((todo: TodoClient) => {
      todo.createdAt = parseInt(
        (new Date(todo.createdAt).getTime() / 1000).toFixed(0)
      );
      todo.dueDate = todo?.dueDate
        ? (parseInt(
            (new Date(todo.dueDate).getTime() / 1000).toFixed(0)
          ) as number)
        : null;
      return todo;
    });

    return todos;
  }

  return [];
}

async function getTodos(user: any) {
  if (!user) return;

  // Get all todos
  const todos = await prisma.todo.findMany({
    where: {
      author: user,
    },
  });

  const t = transformTodos(todos);
  return t;
}

export const metadata = {
  title: "Todo List | Home",
  description: "Todo List Home Page",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

async function HomePage() {
  const session = await getServerSession(authOptions);
  const todos = await getTodos(session?.user);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      {todos && (
        <>
          <div
            style={{
              minHeight: "calc(100vh - 64px)",
            }}
            className={`w-full flex flex-col items-center ${
              todos?.length > 0 ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-[100%] md:w-[75%]">
              {todos.length > 0 &&
                todos.map((todo) => {
                  return <TodoItem key={todo.id} todo={todo} />;
                })}

              <TitleForm />
            </div>

            <div
              className={`mt-8 text-center flex flex-col gap-4 ${
                todos.length > 0
                  ? "hidden"
                  : "block items-center justify-start "
              }`}
            >
              <BsCalendarCheck className="text-8xl" />

              <div className="text-center">
                <h4 className="text-2xl">No tasks found.</h4>
                <p className="text-sm">
                  You can add tasks by clicking on the + button above.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
