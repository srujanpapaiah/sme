"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NextRequest, NextResponse } from "next/server";
import { toast, Toaster } from "react-hot-toast";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Dashboard(req: NextRequest) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    role: "",
    __v: 0,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        const userData = res.data.data;
        setIsLoggedIn(true);
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  // if (path === "email" && data.role !== "email") {
  //   toast.error("Not Authorized");
  //   return NextResponse.json({
  //     message: "Not Authorized",
  //     status: 401,
  //   });
  // }

  return (
    <div className="flex flex-col mt-10  text-white">
      {isLoggedIn ? (
        <div className="flex justify-between px-8">
          <Toaster />
          <h1 className="text-3xl mb-4">
            {`Howdy ${data.username},  (${data.role})${
              data.role === "revechat"
                ? "so you cannot access the remaining departments data"
                : ""
            }`}
          </h1>
          <div className="">
            {data.role === "email" ? (
              <Link href="/email">
                <span>go to </span>
                <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                  Emails
                </button>
              </Link>
            ) : null}
            {data.role === "doubts" ? (
              <Link href="/doubts">
                <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                  Doubts
                </button>
              </Link>
            ) : null}
            {data.role === "assignment" ? (
              <Link href="/assignments">
                <span>go to </span>
                <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                  Assignments
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl text-center text-lime-500 mb-4">
            Welcome to PWSkills SME portal
          </h1>
          <div className="flex justify-center space-x-4">
            <a
              href="/login"
              className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300"
            >
              Login
            </a>
            <a
              href="/signup"
              className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
