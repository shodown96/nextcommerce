"use client";

import { sendContact } from "@/actions/submissions/contact";
import AuthTitle from "@/components/custom/auth-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MESSAGES } from "@/lib/constants/messages";
import {
  ContactParamsSchema,
  ContactParamsType,
} from "@/lib/validations/submissions";
import { useUser } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function ContactPage() {
  const { user } = useUser()
  const handleFormSubmit = async (values: ContactParamsType) => {
    // toast.success("Work in progress");
    try {
      const result = await sendContact(values);
      if (result) {
        toast.success(MESSAGES.SuccessfulContact);
        formik.resetForm()
      }
    } catch (error) {
      toast.error(MESSAGES.UnexpectedError);
    }
  };

  const formik = useFormik<ContactParamsType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: ContactParamsSchema,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
    isSubmitting,
  } = formik;

  useEffect(() => {
    if (user?.firstName) {
      setValues({
        ...values,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
      })
    }
  }, [])
  return (
    <div className="grid h-full grid-cols-10 gap-4">
      <div className="col-span-4 min-h-[90vh] max-lg:col-span-full">
        <div className="flex max-lg:flex-col-reverse gap-10 justify-center items-center mb-10">
          <div className="lg:w-[500px] pt-20">
            <AuthTitle
              title="Contact us"
              description="Feel free to use the form below"
            />

            <div className="flex gap-4 flex-col">
              <div className="flex lg:flex-row flex-col gap-2 w-full">
                <Input
                  label="First Name"
                  id="firstName"
                  type="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={errors.firstName}
                  touched={touched.firstName}
                  containerClass="flex-1"
                  placeholder="Enter your First Name"
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  type="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={errors.lastName}
                  touched={touched.lastName}
                  containerClass="flex-1"
                  placeholder="Enter your Last name"
                />
              </div>

              <Input
                label="Email"
                id="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                placeholder="Enter your Email"
              />
              <Textarea
                label="Message"
                id="message"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                error={errors.message}
                touched={touched.message}
                placeholder="Message"
              />
              <Button
                className="w-full"
                loading={isSubmitting}
                onClick={() => handleSubmit()}>
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 h-full p-3 max-lg:hidden">
        <div className="bg-primary rounded-xs animate-background-change-auth h-full grow bg-cover bg-center rounded-lg"></div>
      </div>
    </div>
  )
}
