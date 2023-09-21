"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
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

  return (
    <div className="flex flex-col justify-center items-center h-screen  text-white">
      {isLoggedIn ? (
        <div>
          <h1 className="text-3xl mb-4">
            Hello {data.username}, your role is {data.role}
          </h1>
          <div className="flex gap-4">
            <Link href="/email">
              <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                Emails
              </button>
            </Link>
            <Link href="/doubts">
              <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                Doubts
              </button>
            </Link>
            <Link href="/assignments">
              <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                Assignments
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="border border-lime-500 p-4 rounded bg-lime-500 text-2xl mb-4">
            Welcome to PWSkills SME portal
          </h1>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="border border-lime-500 px-6 py-3 rounded text-lime-500 hover:bg-lime-500 hover:text-white transition duration-300">
                Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
