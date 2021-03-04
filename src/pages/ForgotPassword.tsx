import React from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { emailRegex } from "../constants/regex";

const ForgotPassword: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Id is required")
        .matches(emailRegex, "Invalid email address"),
    }),
    onSubmit: (values) => {
      // Handle form submission with validated values
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <Card horizontal className="w-full md:max-w-screen-sm ">
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Forgot Password
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col">
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <TextInput
              id="email"
              name="email"
              placeholder="Johndoe@gmail.com"
              type="email"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched("email", true);
              }}
              color={
                !formik.touched.email
                  ? ""
                  : formik.errors.email
                    ? "failure"
                    : "success"
              }
              helperText={
                <>
                  {formik.touched.email && (
                    <span className="font-medium">{formik.errors.email}</span>
                  )}
                </>
              }
            />
          </div>
          <div className="mb-7">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Reset Password
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Remember your password?&nbsp;
            <Link to="/" className="text-primary-600 dark:text-primary-200">
              Sign In
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
