import { auth, clerkClient } from "@clerk/nextjs/server";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import {
  VerifyPasswordRequest,
  VerifyPasswordResponse,
} from "@/types/auth";

export const verifyPassword = async ({
  password,
}: VerifyPasswordRequest): Promise<VerifyPasswordResponse> => {
  try {
    const { userId } = auth();
    if (!userId) return { error: ERROR_MESSAGES.AuthenticationError };
    const { verified } = await clerkClient.users.verifyPassword({
      password,
      userId,
    });
    return { verified };
  } catch (error) {
    console.error("Error to verify password", error);
    return { error: "incorrect_password" };
  }
};
