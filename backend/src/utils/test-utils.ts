import { PrismaClient } from "@prisma/client";
import app from "./app";

export const createTestServer = () => {
  const prisma = new PrismaClient();

  const internalConfig: { server: any } = {
    server: undefined,
  };

  beforeAll(async () => {
    const instance = app().listen({ port: 8003 });

    internalConfig.server = instance;

    await prisma.$connect();
  });

  afterAll(async () => {
    internalConfig.server.close();
    await prisma.$disconnect();
  });

  return {
    prisma,
    serverURL: `http://localhost:8003`,
  };
};
