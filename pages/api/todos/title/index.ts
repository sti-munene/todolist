import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Fetch the Session
    const session = await unstable_getServerSession(req, res, authOptions);
    try {
      // Create a new Todo
      const todoInstance = await prisma.todo.create({
        data: {
          title: req.body.title,
          author: {
            connect: {
              email: session?.user?.email,
            },
          },
          priority: "Low",
        },
      });
      return res.json({ message: "Todo Created.", data: todoInstance });
    } catch {
      return res.json({ message: "Something went wrong." });
    }
  }

  return res.json({ message: "Something went wrong." });
}
