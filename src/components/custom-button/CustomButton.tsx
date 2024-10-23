import { Button, ButtonProps } from "antd";
import React, { ButtonHTMLAttributes } from "react";

interface CustomButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  text?: string;
  title?: string;
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
        type={type}
        onClick={onClick}
        className={`${className} border rounded-md`}
      >
        {icon && <span>{icon}</span>} {text}
      </button>
    </>
  );
}
