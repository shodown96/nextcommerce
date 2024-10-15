import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";

export const mapErrorToMessage = (code: string): string => {
  switch (code) {
    case "form_password_incorrect":
    case "form_identifier_not_found":
    case "form_param_format_invalid":
    case "incorrect_password":
      return ERROR_MESSAGES.InvalidCredentials;
    case "form_param_nil":
      return ERROR_MESSAGES.RequiredDetails;
    case "form_identifier_exists":
      return ERROR_MESSAGES.EmailAddressTaken;
    case "no_password_set":
      return ERROR_MESSAGES.NoPasswordSet;
    case "identifier_already_signed_in":
      return ERROR_MESSAGES.AlreadySignedIn;
    case "verification_expired":
      return ERROR_MESSAGES.ExpiredCode;
    case "form_conditional_param_value_disallowed":
      return ERROR_MESSAGES.PasswordNotSet;
    case "form_code_incorrect":
      return ERROR_MESSAGES.InvalidCode;
    case "form_password_pwned":
      return ERROR_MESSAGES.PasswordBreeched
    default:
      return ERROR_MESSAGES.UnexpectedError;
  }
};

export const isAuthPath = (pathname: string) => {
  const authPaths: string[] = [
    PATHS.SIGN_IN,
    PATHS.SIGN_UP,
    PATHS.SSO_CALLBACK,
    PATHS.FORGOT_PASSWORD,
    PATHS.CHANGE_PASSWORD,
  ];
  return authPaths.includes(pathname);
};

export const formatSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;
  return formattedTime;
};
