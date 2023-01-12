import { BsCalendarCheck, BsGithub } from "react-icons/bs";
import Note from "../components/todoItem";
import { use } from "react";
import axios from "axios";
import { unstable_getServerSession, User, Session } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "../lib/prisma";
import TitleForm from "../components/forms/titleForm";
import TodoItem from "../components/todoItem";
import { TodoClient } from "../types";
import { Button } from "../components/buttons";
import { getProviders } from "next-auth/react";

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
  console.log(t);
  return t;
}

function HomePage() {
  const session = use(unstable_getServerSession(authOptions));
  const todos = use(getTodos(session?.user));
  const providers = use(getProviders());

  if (!session) {
    return (
      <div className="providers-wrapper w-full flex items-center justify-center">
        <div className="flex flex-col items-center mx-auto w-fit py-8 px-4 rounded-lg border border-white border-opacity-5">
          <div className="w-full flex items-center justify-center text-sm mb-4 px-4 py-1 rounded-md bg-blue-500 bg-opacity-10 text-blue-600">
            <p>Login to Continue</p>
          </div>

          <Button provider={providers?.github}>
            <span>Sign in with GitHub</span>
            <BsGithub
              style={{
                fontSize: "16px",
              }}
            />
          </Button>
        </div>
      </div>
    );
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
