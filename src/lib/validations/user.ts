import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";
import { imageObject } from "./common";

const ProfileUpdateParams = z.object({
    firstName: z.string({
        required_error: VALIDATION_MESSAGES.FirstNameRequired,
    }),
    lastName: z.string({
        required_error: VALIDATION_MESSAGES.LastNameRequired,
    }),
    image: imageObject
});

export const ProfileUpdateParamsSchema = toFormikValidationSchema(ProfileUpdateParams);
export type ProfileUpdateParamsType = z.infer<typeof ProfileUpdateParams>;