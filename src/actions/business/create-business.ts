"use server";

import type { GetUserRequest, GetUserResponse } from "@/types/user";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { BusinessSchemaType } from "@/lib/validations/business";
import { Business } from "@prisma/client";

export const createBusiness = async ({
  params
}: { params: BusinessSchemaType }): Promise<Business | null> => {
  try {
    const user = await currentUser()
    if (!user) throw new Error("User not found");

    let business = await prisma.business.update({
      where: { clerkUserId: user.id },
      data: params
    })

    if (!business) {
      business = await prisma.business.create({
        data: {
          ...params,
          clerkUserId: user.id
        }
      });
    }

    return business;
  } catch (error) {
    console.error("Error to get user", error);
    return null;
  }
};
