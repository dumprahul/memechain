import { config } from "@/utils/config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local"
import { headers } from "next/headers";
import { Providers } from "./providers";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Embedded Accounts UI Components Quickstart NextJs Template",
  description: "Embedded Accounts UI Components Quickstart NextJs Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined
  );

  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
