export const ERROR_MESSAGES = {
  BadRequestError: "Bad Request Error",
  AccountAlreadyCreated: "You already have an account with us.",
  AlreadySignedIn: "You're already signed in.",
  AuthenticationError: "You're not signed in.",
  EmailAddressTaken: "The provided email address is taken. Please try another.",
  ExpiredCode: "The code you provided has expired.",
  InternalServerError: "Internal Server Error.",
  InvalidCode: "The code you provided is invalid.",
  InvalidCredentials: "Invalid Credentials Provided.",
  NoPasswordSet: "This user does not have a password set for their account.",
  PasswordNotSet: "Your password was not set before.",
  RequiredDetails: "Please Fill in Required Details!",
  UnexpectedError: "Unable to process request, please try again later.",
  UserAlreadyExists: "A user registered with this email already exists.",
  PasswordBreeched: "Password has been found in an online data breach. For account safety, please use a different password."
};

export const VALIDATION_MESSAGES = {
  CodeRequired: "Verification code is required.",
  EmailInvalid: "Please enter a valid email.",
  EmailRequired: "Email is required.",
  Required: "{} is required.",
  FirstNameRequired: "First name is required.",
  LastNameRequired: "Last name is required.",
  PasswordMismatch: "Passwords must match!",
  PasswordRequired: "Password is required.",
};

export const MESSAGES = {
  PasswordChangedSuccessfully: "A password reset code was sent to your email.",
  PasswordResetCodeSent: "A password reset code was sent to your email.",
  RegistrationCodeSent: "A confirmation code was sent to your email.",
  ResetPasswordSuccessfully:
    "Your password has been reset successfully. You can sign in using your new password now.",
  Success: "Success.",
};

export const CONSUMER_VALIDATION_MESSAGES = {
  genderRequired: "Gender is required",
  invalidAgeRange: "Invalid age range",
  invalidHouseholdIncomeRange: "Invalid household income range",
  locationRequired: "Location is required",
  nationalityRequired: "Nationality is required",
};
