"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
const { Button, Pointer } = require("@cred/neopop-web/lib/components");

export default function Dashboard() {
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
            {`Howdy ${data.username}, ${(<i>`${data.role}`</i>)} ${
              data.role === "revechat" ? (
                <i>revechat agents cannot see their analytics here.</i>
              ) : (
                ""
              )
            }`}
          </h1>
          <span className="flex items-center gap-2">
            <h1>go to</h1>
            <Pointer color="#06C270" />
          </span>

          <div className="">
            {data.role === "email" ? (
              <Link href="/email">
                <Button
                  colorConfig={{
                    backgroundColor: "#0d0d0d",
                    borderColor: "#E5FE40",
                    color: "#ffffff",
                    disabledColors: {
                      backgroundColor: "#8A8A8A",
                      color: "rgba(255,255,255, 0.5)",
                      edgeColors: {
                        bottom: "#E0E0E0",
                        left: "transparent",
                        right: "#EFEFEF",
                        top: "transparent",
                      },
                    },
                    edgeColors: {
                      bottom: "#67721F",
                      left: "transparent",
                      right: "#A2B42D",
                      top: "transparent",
                    },
                  }}
                  colorMode="dark"
                  kind="elevated"
                  size="big"
                  variant="secondary"
                >
                  Emails
                </Button>
              </Link>
            ) : null}
            {data.role === "doubts" ? (
              <Link href="/doubts">
                <Button
                  colorConfig={{
                    backgroundColor: "#0d0d0d",
                    borderColor: "#E5FE40",
                    color: "#ffffff",
                    disabledColors: {
                      backgroundColor: "#8A8A8A",
                      color: "rgba(255,255,255, 0.5)",
                      edgeColors: {
                        bottom: "#E0E0E0",
                        left: "transparent",
                        right: "#EFEFEF",
                        top: "transparent",
                      },
                    },
                    edgeColors: {
                      bottom: "#67721F",
                      left: "transparent",
                      right: "#A2B42D",
                      top: "transparent",
                    },
                  }}
                  colorMode="dark"
                  kind="elevated"
                  size="big"
                  variant="secondary"
                >
                  Doubts
                </Button>
              </Link>
            ) : null}
            {data.role === "discord" ? (
              <Link href="/discord">
                <Button
                  colorConfig={{
                    backgroundColor: "#0d0d0d",
                    borderColor: "#E5FE40",
                    color: "#ffffff",
                    disabledColors: {
                      backgroundColor: "#8A8A8A",
                      color: "rgba(255,255,255, 0.5)",
                      edgeColors: {
                        bottom: "#E0E0E0",
                        left: "transparent",
                        right: "#EFEFEF",
                        top: "transparent",
                      },
                    },
                    edgeColors: {
                      bottom: "#67721F",
                      left: "transparent",
                      right: "#A2B42D",
                      top: "transparent",
                    },
                  }}
                  colorMode="dark"
                  kind="elevated"
                  size="big"
                  variant="secondary"
                >
                  Discord
                </Button>
              </Link>
            ) : null}
            {data.role === "assignment" ? (
              <Link href="/assignment">
                <Button
                  colorConfig={{
                    backgroundColor: "#0d0d0d",
                    borderColor: "#E5FE40",
                    color: "#ffffff",
                    disabledColors: {
                      backgroundColor: "#8A8A8A",
                      color: "rgba(255,255,255, 0.5)",
                      edgeColors: {
                        bottom: "#E0E0E0",
                        left: "transparent",
                        right: "#EFEFEF",
                        top: "transparent",
                      },
                    },
                    edgeColors: {
                      bottom: "#67721F",
                      left: "transparent",
                      right: "#A2B42D",
                      top: "transparent",
                    },
                  }}
                  colorMode="dark"
                  kind="elevated"
                  size="big"
                  variant="secondary"
                >
                  Assignments
                </Button>
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
