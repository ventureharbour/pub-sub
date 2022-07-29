import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/prisma";

export default async function updatePerson(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, channel } = req.body;
  if (!name || !channel) {
    return res.status(400).send("Please provide a name and channel");
  }
  const person = await prisma.people.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      channel: { set: channel },
      name: { set: name },
    },
  });
  res.send(person);
}
