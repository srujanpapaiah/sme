"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import React from "react";
const { Button, Pointer, Tag } = require("@cred/neopop-web/lib/components");

// eslint-disable-next-line @next/next/no-async-client-component

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([
    {
      _id: "",
      creator: "",
      creatorId: "",
      department: "",
      subject: "",
      description: "",
      priority: "low",
      date: null,
      studentName: "",
      studentEmail: "",
      studentPhone: "",
      courseEnrolled: "",
      courseInvoice: "",
      createdAt: null,
      __v: 0,
    },
  ]);

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
        const ticketsRes = await axios.get("/api/tickets/all");

        const userData = res.data.data;
        const ticketsData = ticketsRes.data.data;
        setIsLoggedIn(true);
        setData(userData);
        setTickets(ticketsData);
        console.log(ticketsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Hells");
  });

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
    <div className="flex flex-col mt-10  text-[#CDD0D4] ">
      {isLoggedIn ? (
        <div>
          {" "}
          <div className="flex justify-between px-8">
            <Toaster />
            <h1 className="text-3xl mb-4">
              {`Howdy, ${data.username}! ${
                data.role === "revechat" ? (
                  <i>Reve Chat agents cannot see their analytics here.</i>
                ) : (
                  ""
                )
              }`}
            </h1>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <h1>go to</h1>
                <Pointer color="#06C270" />
              </div>
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
          {/* Tickets */}
          <div className="flex gap-4 px-8 mt-10">
            <div className="flex-grow w-1/2 bg-[#242526] rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-semibold mb-4 text-[#E3E6EA]">
                Support Tickets
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-[#E3E6EA] text-lg">
                      <th className="text-center w-1/4">Subject</th>
                      <th className="text-center w-1/6">Priority</th>
                      <th className="text-center w-1/4">Email</th>
                      <th className="text-center w-3/8">Description</th>
                      <th className="text-center w-1/8">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket, index) => (
                      <React.Fragment key={ticket._id}>
                        <tr>
                          <td className="text-center p-2">{ticket.subject}</td>
                          <td className="text-center p-2">
                            {ticket.priority === "low" && (
                              <Tag
                                colorConfig={{
                                  background: "#E6F9F1",
                                  color: "#06C270",
                                }}
                              >
                                {ticket.priority}
                              </Tag>
                            )}
                            {ticket.priority === "medium" && (
                              <Tag
                                colorConfig={{
                                  background: "#FEF4EB",
                                  color: "#F08D32",
                                }}
                              >
                                {ticket.priority}
                              </Tag>
                            )}
                            {ticket.priority === "high" && (
                              <Tag
                                colorConfig={{
                                  background: "#EE4D37",
                                  color: "#FBFBFB",
                                }}
                              >
                                {ticket.priority}
                              </Tag>
                            )}
                          </td>
                          <td className="text-center p-2">
                            {ticket.studentEmail}
                          </td>
                          <td className="text-center p-2">
                            <div className="max-h-16 overflow-hidden">
                              {ticket.description.length > 30
                                ? `${ticket.description.slice(0, 30)}....`
                                : ticket.description}
                            </div>
                          </td>
                          <td className="text-center p-2">
                            <button className="px-4 py-2 text-[#E6E9EC] bg-[#4E4F50] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300">
                              More
                            </button>
                          </td>
                        </tr>
                        {index < tickets.length - 1 && (
                          <tr>
                            <td colSpan={5} className="p-2">
                              <hr
                                className="border-t border-gray-300"
                                style={{ borderColor: "#3D4042" }}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-1/3 h-full">
              <div className="flex-grow bg-[#242526] rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
              </div>
              <div className="flex-grow bg-[#242526] rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Announcement 2</h2>
              </div>
            </div>
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
