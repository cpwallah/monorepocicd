// app/api/users/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Failed to fetch users", { status: 500 });
  } finally {
    await prisma.$disconnect(); // optional but clean
  }
}
