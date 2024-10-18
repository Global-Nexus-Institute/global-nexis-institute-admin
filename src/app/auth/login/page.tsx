"use client";
import React, { useEffect } from "react";
import LoginFrom from "./_components/login-form/LoginFrom";
import { useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";

export default function LoginPage() {
  const { user, loading, error, successMesage } = useAppSelector(
    (store: RootState) => store.auth,
  );

  useEffect(() => {
    if (!loading && successMesage) {
      alert(successMesage);
    }
    if (!loading && error) {
      alert(error);
    }
  }, [user, loading, error, successMesage]);
  return (
    <div className="flex flex-col w-full justify-center items-center bg-blue-900 h-[100%]">
      <LoginFrom />
    </div>
  );
}
