import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";

const ProfileUpdateParams = z.object({
    firstName: z.string({
        required_error: VALIDATION_MESSAGES.FirstNameRequired,
    }),
    lastName: z.string({
        required_error: VALIDATION_MESSAGES.LastNameRequired,
    }),
    image: z
        .any()
        .refine((file) => file.size <= 1024 * 1024, 'File size should be less than 1MB')
        .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Only .jpg and .png files are allowed')
        .optional()
});

export const ProfileUpdateParamsSchema = toFormikValidationSchema(ProfileUpdateParams);
export type ProfileUpdateParamsType = z.infer<typeof ProfileUpdateParams>;