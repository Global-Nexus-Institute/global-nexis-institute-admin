import { Button, ButtonProps, Spin } from "antd";
import React, { ButtonHTMLAttributes } from "react";

interface CustomButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  text?: string;
  title?: string;
  loading?: boolean;
  onClick?: () => void;
  color?: string;
  icon?: React.ReactNode;
  height?: number;
  width?: number;
  className?: string;
}
export default function CustomButton({
  type,
  text,
  title,
  loading,
  onClick,
  color,
  icon,
  height,
  width,
  className,
}: CustomButtonProps) {
  return (
    <>
      <button
        aria-label={title}
        style={{
          color: color,
          height: `${height ?? 40}px`,
          width: `${width ?? 40}px`,
        }}
        disabled={loading}
        type={type}
        onClick={onClick}
        className={`${className} border rounded-md ${loading && "opacity-50"}`}
      >
        {loading && (
          <span className="loading">
            <Spin spinning={loading} size="small"></Spin>
          </span>
        )}{" "}
        {icon && <span>{icon}</span>} {text}
      </button>
    </>
  );
}
