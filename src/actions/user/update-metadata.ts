"use server";

import { clerkClient } from "@clerk/nextjs/server";
import type {
  UpdateMetadataRequest,
  UpdateMetadataResponse,
} from "@/types/user";

export const updateMetadata = async ({
  userId,
  ...publicMetadata
}: UpdateMetadataRequest): Promise<UpdateMetadataResponse | null> => {
  try {

    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata,
    });

    return { userId: user.id };
  } catch (error) {
    console.error("Error to update user metadata", error);
    return null;
  }
};
