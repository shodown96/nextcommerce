"use server";

import { clerkClient } from "@clerk/nextjs/server";
import type {
  UpdateMetadataRequest,
  UpdateMetadataResponse,
} from "@/types/user";

export const updateMetadata = async ({
  userId,
  secure = false,
  ...metadata
}: UpdateMetadataRequest): Promise<UpdateMetadataResponse | null> => {
  try {

    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: !secure ? metadata : undefined,
      privateMetadata: secure ? metadata : undefined,
    });

    return { userId: user.id };
  } catch (error) {
    console.error("Error to update user metadata", error);
    return null;
  }
};
