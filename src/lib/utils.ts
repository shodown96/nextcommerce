import { ClerkError } from "@/types/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const format = (...args: any) => {
  let i = 1;
  const str = args[0];
  return str.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
}

// required_error: format(VALIDATION_MESSAGES.Required, "Title"),

export const formatSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
};

export const isClerkError = (obj: any): obj is ClerkError => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray(obj.errors) &&
    obj.errors.every((error: any) => (
      typeof error === 'object' &&
      error !== null &&
      typeof error.code === 'string' &&
      typeof error.message === 'string' &&
      typeof error.longMessage === 'string' &&
      error.meta &&
      typeof error.meta === 'object' &&
      typeof error.meta.paramName === 'string'
    ))
  );
}