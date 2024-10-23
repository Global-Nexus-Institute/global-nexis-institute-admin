"use client";
import React, { useEffect } from "react";
import LoginFrom from "./_components/login-form/LoginFrom";
import { useAppDispatch, useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import { Alert } from "antd";
import { resetAuthState } from "@/lib/features/slices/auth.slice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { user, loading, error, successMesage } = useAppSelector(
    (store: RootState) => store.auth,
  );

  const dispatch = useAppDispatch();

  const closeAlert = () => {
    dispatch(resetAuthState());
  };

  const router = useRouter();

  useEffect(() => {
    if (!loading && successMesage) {
      router.replace(`/?user=${user?._id}`);
    }
    if (!loading && error) {
      alert(error);
    }
  }, [loading, error, successMesage]);
  return (
    <div className="flex flex-col w-full justify-center items-center bg-blue-900 h-full py-10">
      {error && (
        <Alert
          message={error}
          className="border border-2 border-red-500"
          onClick={() => closeAlert()}
        />
      )}
      <LoginFrom />
    </div>
  );
}
