"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavbarItemProps {
  className?: string;
  href: string;
  icon?: ReactNode;
  text: string;
  type?: "button" | "link";
}

export const NavbarItem = ({
  className,
  href,
  icon,
  text,
  type = "link",
}: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const commonStyles = cn(
    "flex items-center justify-center transition-all",
    className,
  );

  const linkStyles = cn(
    "text-white h-full border-transparent px-1 transition-all hover:font-bold",
    isActive && "font-bold",
  );

  const buttonStyles =
    "bg-brand-98 text-brand-50 hover:bg-white h-12 space-x-1 rounded-[8px] font-semibold transition-all";

  return (
    <Link
      className={cn(commonStyles, type === "link" ? linkStyles : buttonStyles)}
      href={href}
    >
      {icon ?? null}
      <span className={cn(!icon && "w-full text-center")}>{text}</span>
    </Link>
  );
};
