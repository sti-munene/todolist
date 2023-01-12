import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todoId = req.query.id;

  if (req.method === "DELETE") {
    await prisma.todo.delete({
      where: { id: todoId as string },
    });
    return res.status(200).json({ message: "Todo deleted." });
  }

  if (req.method === "PATCH") {
    const todo = await prisma.todo.update({
      data: {
        ...req.body,
      },
      where: {
        id: todoId as string,
      },
    });

    return res.status(200).json({ data: todo, message: "Todo updated." });
  }

  if (req.method !== "PATCH" && req.method !== "DELETE") {
    return res.status(405).json({
      message: `The HTTP ${req.method} method is not supported at this route.`,
    });
  }
}
