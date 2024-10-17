"use server";

import type { GetUserRequest, GetUserResponse } from "@/types/user";
import prisma from "@/lib/prisma";

export const getUser = async ({
  clerkUserId,
}: GetUserRequest): Promise<GetUserResponse | null> => {
  try {
    const user = await prisma.account.findFirst({
      where: { clerkUserId },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Error to get user", error);
    return null;
  }
};
