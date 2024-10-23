import React from "react";
import "../globals.css";
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full h-screen">{children}</div>;
}
