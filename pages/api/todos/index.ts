import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch the Session
    const session = await getServerSession(req, res, authOptions);

    // Get all todos
    const todosList = await prisma.todo.findMany({
      where: {
        author: session?.user,
      },
    });

    return res.json({
      data: {
        todos: todosList,
      },
    });
  }

  return res.json({ message: "Something went wrong." });
}
