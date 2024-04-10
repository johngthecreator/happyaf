"use client";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Toaster />
      <div className="h-screen flex flex-col">
          {children}
          <Header />
      </div>
    </SessionProvider>
  );
}
 