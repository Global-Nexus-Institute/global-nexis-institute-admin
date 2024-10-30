"use client";
import React, { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store.hooks";
import { RootState } from "@/lib/store/store";
import SignUp from "./_components/SignUpForm";
import { Alert } from "antd";
import { resetAuthState } from "@/lib/features/slices/auth.slice";
import { useRouter } from "next/navigation";

export default function SingUpPage() {
  const router = useRouter();
  const { user, loading, error, successMesage } = useAppSelector(
    (store: RootState) => store.auth,
  );
  const dispatch = useAppDispatch();
  const closeAlert = () => {
    dispatch(resetAuthState());
  };

  useEffect(() => {
    if (!loading && successMesage) {
      alert(successMesage);
      router.replace(`/?user=${user?._id}`);
    }
    if (!loading && error) {
      // alert(error);
      console.log("Captured error: ", error);
    }
  }, [loading, error, successMesage]);
  return (
    <div className="flex flex-col w-full justify-center items-center  py-10">
      {error && <Alert message={error} onClick={() => closeAlert()} />}
      <SignUp />
    </div>
  );
}
