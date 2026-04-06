import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "accent" | "danger";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-[#E8731A]/15 text-[#E8731A] ring-[#E8731A]/30",
  success: "bg-green-100 text-green-700 ring-green-300/50",
  accent: "bg-[#D4A843]/15 text-[#8a6b20] ring-[#D4A843]/30",
  danger: "bg-[#C23B22]/15 text-[#C23B22] ring-[#C23B22]/30",
};

export default function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        "ring-1 ring-inset",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
