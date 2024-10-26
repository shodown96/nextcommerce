"use client"
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";
import { z } from "zod";
import { format } from "../utils";

export const fieldObject = z.object({
    label: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Label') }),
    value: z.string({ required_error: format(VALIDATION_MESSAGES.Required, 'Value') })
})

export const imageObject = z
    .any()
    .refine((file) => file.size <= 1024 * 1024, 'File size should be less than 1MB')
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Only .jpg and .png files are allowed')