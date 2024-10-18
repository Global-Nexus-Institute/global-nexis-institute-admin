"use client";

import StyledComponentsRegistry from "@/lib//AntdRegistory";
import React from "react";

export const AntdStyledComponentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};
