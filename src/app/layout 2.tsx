import Navbar from "@/app/components/Navbar";

import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Provider } from "react-redux";

import { store } from "@/redux/store";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div suppressHydrationWarning>
          {typeof window === "undefined" ? null : (
            <Provider store={store}>
              <Navbar />
              {children}
            </Provider>
          )}
        </div>
      </body>
    </html>
  );
}
