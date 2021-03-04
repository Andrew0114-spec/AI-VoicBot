import React from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiMail } from "react-icons/hi";
import { useToggle } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import GoogleImage from "../assets/GoogleImage";
import PasswordTextInput from "../components/PasswordTextInput";
import { emailRegex } from "../constants/regex";
import logo from "../assets/image/AI startup.png";
import "../assets/style.css";
import { loginUser } from "../services/api/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validateOnChange: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Id is required")
        .matches(emailRegex, "Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(5, "Must be at least 5 characters")
        .matches(/^(?=.*[0-9])/, "Must contain at least one number"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        console.log("Registration successful", response);
        toast.success("You Have Successfully Logged", {
          onClose: () => navigate("/home"),
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Registration failed", error);
        toast.error("Invalid Username or Password");
      }
    },
  });

  return (
    <section className="w-full px-4 lg:px-24">
      <div
        className="mt-20 flex h-full rounded-2xl md:mt-0"
        style={{ maxHeight: "740px" }}
      >
        <ToastContainer />
        <div className="backgroundImg hidden w-1/2 rounded-s-2xl md:block"></div>
        {/* <div className="mg:w-1/2 flex w-full flex-col items-center justify-center rounded-e-2xl bg-[#f5f6fa] py-5"> */}
        <div className="w-full rounded-e-2xl bg-[#f5f6fa] py-5 md:w-1/2">
          <div className="mg:w-3/5 mx-auto w-[95%] sm:w-3/4">
            <div className="mx-auto my-6 flex size-16 items-center justify-center gap-x-1 rounded-lg  md:size-32 lg:my-0">
              <img
                alt="Flowbite logo"
                src={logo}
                className="h-full max-h-[60px] w-auto rounded-lg"
              />
            </div>
            <Card className="mt-5 w-full border-none bg-transparent shadow-none">
              <h1 className="mb-2 text-xl dark:text-white">
                Sign in to Flowbite
              </h1>
              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <div className="flex flex-col">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email" />
                    </div>
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
                  </div>
                  <div className="mt-2 flex flex-col">
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Password" />
                    </div>
                    <PasswordTextInput
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      color={
                        !formik.touched.password
                          ? ""
                          : formik.errors.password
                            ? "failure"
                            : "success"
                      }
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      helperText={
                        <>
                          {formik.touched.password &&
                            formik.errors.password && (
                              <span className="font-medium">
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
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <Checkbox id="rememberMe" name="rememberMe" />
                    <Label htmlFor="rememberMe">Remember me</Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-primary-600 w-1/2 text-right text-sm dark:text-white"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="bg-[#00aeef]"
                >
                  Sign In
                </Button>
                <button
                  aria-label="Sign in with Google"
                  className="border-button-border-light flex items-center justify-center rounded-md border bg-white p-0.5 pr-3"
                >
                  <div className="flex size-9 items-center justify-center rounded-l bg-white">
                    <GoogleImage />
                  </div>
                  <span className="text-sm tracking-wider text-google-text-gray">
                    Sign in with Google
                  </span>
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  {"Don’t have an account yet?"}{" "}
                  <Link
                    to="/signup"
                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                  >
                    Sign up
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

export default SignIn;
