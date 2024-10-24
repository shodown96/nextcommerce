import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";
import { format } from "../utils";

const ContactParams = z.object({
  firstName: z.string({
    required_error: format(VALIDATION_MESSAGES.Required, "First name"),
  }),
  lastName: z.string({
    required_error: format(VALIDATION_MESSAGES.Required, "Last name"),
  }),
  email: z
    .string({
      required_error: format(VALIDATION_MESSAGES.Required, "Email"),
    })
    .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
  message: z.string({
    required_error: format(VALIDATION_MESSAGES.Required, "Message"),
  }),
});

export const ContactParamsSchema = toFormikValidationSchema(ContactParams);
export type ContactParamsType = z.infer<typeof ContactParams>;