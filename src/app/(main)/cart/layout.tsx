import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata:Metadata = {
  title:'NextCommerce | Shopping Cart'
}

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8 px-10">
      {children}
    </div>
  );
}
