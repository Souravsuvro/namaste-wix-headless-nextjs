import { HTMLAttributes, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  children?: ReactNode;
}

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

export default function Card({
  imageSrc,
  imageAlt = "",
  imageHeight = 220,
  padding = "md",
  hover = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#FDF6EC] rounded-2xl overflow-hidden border border-[#F5EDE0]",
        "shadow-sm transition-all duration-300",
        hover && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {imageSrc && (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: imageHeight }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {children && (
        <div className={paddingClasses[padding]}>{children}</div>
      )}
    </div>
  );
}
