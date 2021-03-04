import React from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "../hooks";
import PasswordTextInput from "../components/PasswordTextInput";
import logo from "../assets/image/AI startup.png";
import "../assets/style.css";
import { registerUser } from "../services/api/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Id is required")
        .matches(emailRegex, "Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(5, "Must be at least 5 characters")
        .matches(/^(?=.*\d)/, "Must contain at least one number"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      acceptTerms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions",
      ),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const response = await registerUser({ email, password });
        console.log("Registration successful", response);
        toast.success(response?.message, {
          onClose: () => navigate("/home"),
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Registration failed", error);
        toast.error("Email Already Exist");
      }
    },
  });

  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);
  const [isConfirmPasswordVisible, toggleConfirmPasswordVisible] =
    useToggle(false);

  return (
    <section className="w-full px-4 lg:px-24">
      <div
        className="mt-20 flex h-full flex-col flex-wrap overflow-hidden rounded-2xl border md:mt-0 md:flex-row"
        style={{ maxHeight: "740px" }}
      >
        <ToastContainer />
        <div className="backgroundImg hidden w-1/2 rounded-s-2xl md:block"></div>
        <div className="w-full rounded-e-2xl bg-[#f5f6fa] py-5 md:w-1/2">
          <div className="mg:w-3/5 mx-auto w-[95%] sm:w-3/4">
            <div className="flex items-center justify-center gap-x-1 rounded-lg  ">
              <img
                alt="Flowbite logo"
                src={logo}
                className="m-[20px] h-[50px] max-h-[100px] w-auto rounded-lg"
              />
            </div>
            <Card
              // horizontal
              className="mt-5 w-full border-none bg-transparent shadow-none"
            >
              <h1
                className="text-xl dark:text-white"
                style={{ fontFamily: "sans-serif" }}
              >
                Create an Account
              </h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <TextInput
                    id="email"
                    placeholder="Johndoe@gmail.com"
                    type="text"
                    {...formik.getFieldProps("email")}
                    icon={HiMail}
                    color={
                      !formik.touched.email
                        ? ""
                        : formik.errors.email
                          ? "failure"
                          : "success"
                    }
                    onBlur={formik.handleBlur}
                    name="email"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    helperText={
                      <>
                        {formik.touched.email && formik.errors.email && (
                          <span className="text-sm font-medium">
                            {formik.errors.email}
                          </span>
                        )}
                      </>
                    }
                  />
                  {/* <TextInput
                    id="email"
                    placeholder="Johndoe@gmail.com"
                    type="text"
                    {...formik.getFieldProps("email")}
                    icon={HiMail}
                    color={
                      !formik.touched.email
                        ? ""
                        : formik.errors.email
                          ? "failure"
                          : "success"
                    }
                    onBlur={formik.handleBlur}
                    name="email"
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    helperText={
                      <>
                        {formik.touched.email && formik.errors.email && (
                          <span className="text-sm font-medium">
                            {formik.errors.email}
                          </span>
                        )}
                      </>
                    }
                  /> */}
                </div>
                <div className="mt-2 flex flex-col">
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <div className="">
                    <PasswordTextInput
                      id="password"
                      placeholder="Password"
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      color={
                        !formik.touched.password
                          ? ""
                          : !!formik.touched.password &&
                              !!formik.errors.password
                            ? "failure"
                            : "success"
                      }
                      helperText={
                        <>
                          {!!formik.touched.password &&
                            !!formik.errors.password && (
                              <span className="text-sm font-medium">
                                {formik.errors.password}
                              </span>
                            )}
                        </>
                      }
                      isPasswordVisible={isPasswordVisible}
                      togglePasswordVisibility={togglePasswordVisible}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-col">
                  <Label htmlFor="confirmPassword" className="mb-2">
                    Confirm password
                  </Label>
                  <div className="relative">
                    <PasswordTextInput
                      id="confirmPassword"
                      placeholder="Confirm password"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      color={
                        !formik.touched.confirmPassword
                          ? ""
                          : formik.errors.confirmPassword
                            ? "failure"
                            : "success"
                      }
                      helperText={
                        <>
                          {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                              <span className="text-sm font-medium">
                                {formik.errors.confirmPassword}
                              </span>
                            )}
                        </>
                      }
                      isPasswordVisible={isConfirmPasswordVisible}
                      togglePasswordVisibility={toggleConfirmPasswordVisible}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-x-3">
                  <Checkbox
                    id="acceptTerms"
                    {...formik.getFieldProps("acceptTerms")}
                  />
                  <Label htmlFor="acceptTerms">
                    I accept the&nbsp;
                    <a
                      href="#"
                      className="text-primary-700 dark:text-primary-200"
                    >
                      Terms and Conditions
                    </a>
                  </Label>
                </div>
                {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                  <span className="text-sm text-red-500">
                    {formik.errors.acceptTerms}
                  </span>
                )}
                <div className="mb-7 mt-6">
                  <Button
                    type="submit"
                    className="w-full bg-[#00aeef]"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Create account
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Already have an account?&nbsp;
                  <Link
                    to="/"
                    className="text-primary-600 dark:text-primary-200"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
