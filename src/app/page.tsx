"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <div className="flex flex-1 justify-center items-center text-3xl font-bold">
    <div>Global Nexus Institute</div>
    <div>
      <Link href="/auth/login">Login</Link>
    </div>
  </div>;
}
