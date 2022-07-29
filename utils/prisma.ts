import { PrismaClient } from "@prisma/client";
import createSubscriber from "pg-listen";

// Prevent multiple instances of Prisma Client in development
declare const global: { prisma?: PrismaClient; subscriber?: any };

export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const subscriber =
  global.subscriber ||
  createSubscriber({ connectionString: process.env.DATABASE_URL });
if (process.env.NODE_ENV === "development") global.subscriber = subscriber;

subscriber.notifications.on("my-channel", (payload: any) => {
  // Payload as passed to subscriber.notify() (see below)
  console.log("Received notification in 'my-channel':", payload);
});

export async function connect() {
  console.log("connecting");
  await subscriber.connect();
  await subscriber.listenTo("my-channel");
}

connect();
