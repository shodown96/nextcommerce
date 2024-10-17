export const FORM_STEPS = {
  CURRENT_PASSWORD: "CURRENT_PASSWORD",
  EMAIL_STEP: "EMAIL_STEP",
  NEW_PASSWORD_STEP: "NEW_PASSWORD_STEP",
  OTP_STEP: "OTP_STEP",
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
};

export const PLACEHOLDERS = {
  EMAIL: "name@mail.com",
  NAME: "Enter Name",
  BUSINESS_NAME: "Enter Business Name",
  WEBSITE: "Enter Website URL",
  PHONE_NUMBER: "Enter Phone Number",
  LOCATION: "Enter Location",
  NEW_PASSWORD: "Enter New Password",
  PASSWORD: "Enter Password",
  SURNAME: "Surname",
};

export const FORGOT_PASSWORD_TEXTS: Record<string, string> = {
  EMAIL_STEP: "Enter a valid email to reset your password",
  NEW_PASSWORD_STEP: "Enter your new password",
  OTP_STEP: "Enter the verification code you received via email",
};

export const FORGOT_PASSWORD_BTN_TEXTS: Record<string, string> = {
  EMAIL_STEP: "Send Recovery Email",
  NEW_PASSWORD_STEP: "Reset",
  OTP_STEP: "Verify",
};

export const CHANGE_PASSWORD_BTN_TEXTS: Record<string, string> = {
  CURRENT_PASSWORD: "Next",
  NEW_PASSWORD_STEP: "Change Password",
  PASSWORD_CHANGED: "Send Again",
};

export const CHANGE_PASSWORD_TEXTS: Record<string, string> = {
  CURRENT_PASSWORD: "Enter your current password to change the current one",
  NEW_PASSWORD_STEP: "Enter your new password",
  PASSWORD_CHANGED:
    "Your password has been changed. You will receive a confirmation email but if you haven’t, make sure your email is correct and click send again.",
};

export const OTP_COUNTDOWN_TIME = 60;
export const OTP_LENGTH = 6;