import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { VALIDATION_MESSAGES } from "@/lib/constants/messages";

const SignUpParams = z.object({
  email: z
    .string({ required_error: VALIDATION_MESSAGES.EmailRequired })
    .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
  firstName: z.string({
    required_error: VALIDATION_MESSAGES.FirstNameRequired,
  }),
  lastName: z.string({
    required_error: VALIDATION_MESSAGES.LastNameRequired,
  }),
  password: z.string({
    required_error: VALIDATION_MESSAGES.PasswordRequired,
  }),
});

export const SignUpParamsSchema = toFormikValidationSchema(SignUpParams);
export type SignUpParamsType = z.infer<typeof SignUpParams>;

const SignInParams = z.object({
  email: z
    .string({ required_error: VALIDATION_MESSAGES.EmailRequired })
    .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
  password: z.string({
    required_error: VALIDATION_MESSAGES.PasswordRequired,
  }),
});

export const SignInParamsSchema = toFormikValidationSchema(SignInParams);
export type SignInParamsType = z.infer<typeof SignInParams>;

const EmailParams = z.object({
  email: z
    .string({ required_error: VALIDATION_MESSAGES.EmailRequired })
    .email({ message: VALIDATION_MESSAGES.EmailInvalid }),
});

export const EmailParamsSchema = toFormikValidationSchema(EmailParams);
export type EmailParamsType = z.infer<typeof EmailParams>;

const CodeParams = z.object({
  code: z.string({ required_error: VALIDATION_MESSAGES.CodeRequired }),
});

export const CodeParamsSchema = toFormikValidationSchema(CodeParams);
export type CodeParamsType = z.infer<typeof CodeParams>;

const ResetPasswordParams = z
  .object({
    confirmPassword: z.string({
      required_error: VALIDATION_MESSAGES.PasswordRequired,
    }),
    newPassword: z.string({
      required_error: VALIDATION_MESSAGES.PasswordRequired,
    }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: VALIDATION_MESSAGES.PasswordMismatch,
    path: ["confirmPassword"],
  });

export const ResetPasswordParamsSchema =
  toFormikValidationSchema(ResetPasswordParams);
export type ResetPasswordParamsType = z.infer<typeof ResetPasswordParams>;

const PasswordParams = z.object({
  currentPassword: z.string({
    required_error: VALIDATION_MESSAGES.PasswordRequired,
  }),
});

export const PasswordParamsSchema = toFormikValidationSchema(PasswordParams);
export type PasswordParamsType = z.infer<typeof PasswordParams>;

const ChangePasswordParams = z
  .object({
    confirmPassword: z.string({
      required_error: VALIDATION_MESSAGES.PasswordRequired,
    }),
    newPassword: z.string({
      required_error: VALIDATION_MESSAGES.PasswordRequired,
    }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: VALIDATION_MESSAGES.PasswordMismatch,
    path: ["confirmPassword"],
  });

export const ChangePasswordParamsSchema =
  toFormikValidationSchema(ChangePasswordParams);
export type ChangePasswordParamsType = z.infer<typeof ChangePasswordParams>;

export type ResetPasswordType = Partial<EmailParamsType> &
  Partial<CodeParamsType>;