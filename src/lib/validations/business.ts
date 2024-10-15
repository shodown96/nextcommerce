import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";

export const EditProfileParams = z.object({
    name: z.string(),
    bio: z.string().optional(),
    brandName: z.string().optional(),
    bookingEmail: z.string().optional(),
    bookingPhone: z.string().optional(),
    website: z.string().optional(),
    headline: z.string().optional(),
    location: z.string().optional(),
    linkedIn: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    category: z.string().optional(),
  });
  
  export const EditProfileParamsSchema =
    toFormikValidationSchema(EditProfileParams);
  export type EditProfileParamsSchemaType = z.infer<typeof EditProfileParams>;