import { InputField } from "@/components/input-field/InputField";
import { useAuth } from "@/shared/hooks/auth/auth.hooks";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Flex, Form, Image, Input } from "antd";
import { Formik, useField } from "formik";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Password from "antd/es/input/Password";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginFrom() {
  const router = useRouter();
  const { loginUser, logOutUser, loginLoading } = useAuth();
  const handleSignUp = () => {
    router.replace("/auth/signup");
  };
  return (
    <div className="flex flex-col items-center justify-center w-[800px] h-full border py-3 overflow-y-scroll">
      <div>
        <Image
          src="/images/logo.png"
          preview={false}
          alt="logo"
          width={400}
          height={300}
        />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginUser(values.email, values.password);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 ">
              <div className="w-full">
                <InputField
                  label="Email"
                  name="email"
                  id="email"
                  placeholder="Enter Email address"
                  type="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <Password
                  name="password"
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  iconRender={() => <FontAwesomeIcon icon={faLock} />}
                  required
                />
              </div>
              <Flex justify="space-between">
                <div>
                  <Checkbox>Remember me</Checkbox>
                </div>
                <div>
                  <a href="#">Forgot password</a>
                </div>
              </Flex>
              <div className="w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loginLoading}
                  disabled={loginLoading}
                  className="w-full"
                >
                  Login
                </Button>
              </div>
              <div className="py-5 cursor-pointer">
                Don&apos;t yet have an account?{" "}
                <span onClick={handleSignUp}>Sign Up</span>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
