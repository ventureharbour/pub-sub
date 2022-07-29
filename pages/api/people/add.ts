import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function addPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, channel } = req.body;
  if (!name || !channel) {
    return res.status(400).send("Please provide a name and channel");
  }
  const person = await prisma.people.create({
    data: {
      channel,
      name,
    },
  });
  res.send(person);
}
