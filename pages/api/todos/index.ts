import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch the Session
    const session = await unstable_getServerSession(req, res, authOptions);

    // Get all todos
    const todosList = await prisma.todo.findMany({
      where: {
        author: session?.user,
      },
    });

    console.log(todosList);

    return res.json({
      data: {
        todos: todosList,
      },
    });
  }

  return res.json({ message: "Something went wrong." });
}
