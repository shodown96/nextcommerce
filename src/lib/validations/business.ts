import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";

export const Business = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

export const BusinessSchema =
  toFormikValidationSchema(Business);
export type BusinessSchemaType = z.infer<typeof Business>;

export const BusinessSocials = z.object({
  website: z.string().optional(),
  linkedIn: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

export const BusinessSocialsSchema =
  toFormikValidationSchema(BusinessSocials);
export type BusinessSocialsSchemaType = z.infer<typeof BusinessSocials>;

export type FullBusinessParams = BusinessSchemaType & BusinessSocialsSchemaType