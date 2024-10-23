"use client";
import React, { useEffect } from "react";
import "../globals.css";
import { useAppSelector } from "@/lib/store/store.hooks";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/hooks/auth/auth.hooks";
import { RootState } from "@/lib/store/store";
import { Spin } from "antd";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authState = useAppSelector((store: RootState) => store.auth);
  const { authStatus } = useAuth();

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push("/");
    }
  }, [authState, authStatus]);
  return (
    <div className="w-screen h-screen bg-[#19173C] flex items-center justify-center">
      <Spin
        size={"large"}
        style={{ color: "#182c61", fontSize: "50px" }}
        spinning={authState.loading}
      >
        {children}
      </Spin>
    </div>
  );
}
