"use server";

import { sendHTML } from "@/lib/email";
import { ContactParamsType } from "@/lib/validations/submissions";

export const sendContact = async ({
  firstName = "",
  lastName = "",
  email = "",
  message = "",
}: ContactParamsType) => {
  console.log({
    firstName,
    lastName,
    email,
    message,
  });
  try {
    await sendHTML({
      subject: 'New contact message from NextCommerce',
      params: {
        email,
        message,
        name: `${firstName} ${lastName}`
      },
      emailType: "contact"
    })
    return true;
  } catch (error) {
    console.log("sendContact error", error)
    return false
  }
};
