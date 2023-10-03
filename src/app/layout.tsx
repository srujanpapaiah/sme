import Navbar from "@/app/components/Navbar";

import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Provider } from "react-redux";

import { store } from "@/redux/store";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWSkills Employee Portal",

  description: "A unified Portal for PWSkills Employees",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProvider> */}
        {/* <Navbar /> */}
        {children}
        {/* </ReduxProvider> */}
      </body>
    </html>
  );
}
