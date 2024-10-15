import type { User } from "@clerk/nextjs/server";

export type ClerkUserName = User["firstName"];

export interface UpdateMetadataRequest {
  onboardingComplete?: boolean;
  userId: string;
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
  userId: number;
}

export interface GetUserRequest {
  clerkUserId: string;
}

export interface GetUserResponse {
  clerkUserId: string;
  companyId: null | number;
  createdAt: Date;
  email: string;
  id: number;
  name: null | string;
  preferences: unknown;
  privacyAccepted: boolean;
  teamId: null | number;
  termsAccepted: boolean;
  updatedAt: Date;
}

export interface GetUserIdResponse {
  userId: number;
}
