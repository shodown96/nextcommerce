import type { User } from "@clerk/nextjs/server";
import { Account } from "@prisma/client";

export type ClerkUserName = User["firstName"];

export interface UpdateMetadataRequest {
  userId: string;
  secure?: boolean;
  onboardingComplete?: boolean;
  stripeConnectAccountId?: string
}

export interface UpdateMetadataResponse {
  userId: string;
}

export interface CreateUserRequest {
  clerkUserId: string;
  email: string;
  name: string;
}

export interface CreateUserResponse {
  userId: string;
}

export interface GetUserRequest {
  clerkUserId: string;
}

export interface GetUserResponse extends Account { }

export interface GetUserIdResponse {
  userId: number;
}
