"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    signIn("sso", {
      callbackUrl: "/dashboard",
      redirect: false,
    });
  }, []);
  return (
    <main className="relative flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
    </main>
  );
}
