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
import { UserCreateType } from "@/shared/types";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignUp() {
  const router = useRouter();
  const { loginUser, createUser, loginLoading } = useAuth();
  const handleLogin = () => {
    router.replace("/auth/login");
  };
  return (
    <div className="flex flex-col items-center justify-center w-[800px] h-full border py-3">
      <div>
        <Image
          src="/images/logo.png"
          preview={false}
          alt="logo"
          width={400}
          height={300}
        />
      </div>
      <Formik<UserCreateType>
        initialValues={{
          email: "",
          password: "",
          name: "",
          role: "admin",
          address: { city: "", country: "", street: "", zipCode: "" },
          phonneNumber: "",
        }}
        onSubmit={(values, {resetForm}) => {
          createUser(values).finally(() => {
              resetForm();
          });
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2 ">
              <div className="w-full">
                <InputField
                  label="Name"
                  name="names"
                  id="names"
                  placeholder="Enter username"
                  type="text"
                  onChange={handleChange}
                  required
                />
              </div>

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
                <InputField
                  label="Password"
                  name="password"
                  id="password"
                  password
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  icon={<FontAwesomeIcon icon={faLock} />}
                  required
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Address"
                  name="address.city"
                  id="address.city"
                  placeholder="Enter City Name"
                  type="text"
                  onChange={handleChange}
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
                  Sign Up
                </Button>
              </div>
              <div className="py-5 cursor-pointer">
                Already have an account?{" "}
                <span onClick={handleLogin}>Login</span>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
