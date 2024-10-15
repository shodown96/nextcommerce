"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "@/types/auth";
import { ERROR_MESSAGES } from "@/lib/constants/messages";

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const { userId } = auth();
    if (!userId) return { error: ERROR_MESSAGES.AuthenticationError };
    const { verified } = await clerkClient.users.verifyPassword({
      password: currentPassword,
      userId,
    });
    if (!verified) {
      return { error: ERROR_MESSAGES.InvalidCredentials };
    }
    const user = await clerkClient.users.updateUser(userId, {
      password: newPassword,
    });
    return { userId: user.id };
  } catch (error) {
    console.error("Error to change password", error);
    return { error: "unexpected_error" };
  }
};
