import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Sign in - Pengooin",
  description: "This is an authentication page",
};

export default function AuthLayout({ children }) {
  return <div>{children}</div>;
}
