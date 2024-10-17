"use server"

import type { CreateUserRequest, CreateUserResponse } from "@/types/user";
import prisma from "@/lib/prisma"

export const createUser = async ({
  clerkUserId,
  email,
  name,
}: CreateUserRequest): Promise<CreateUserResponse | null> => {
  try {
    const existingUser = await prisma.account.findUnique({
      where: { clerkUserId },
    });

    if (existingUser !== null) throw new Error("Existing user");

    const newUser = await prisma.account.create({
      data: {
        clerkUserId,
        email,
        name,
      },
    });

    return { userId: newUser.id };
  } catch (error) {
    console.error("Error to create user", error);
    return null;
  }
};
