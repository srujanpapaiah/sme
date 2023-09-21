"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ clicked }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: "",
    isVerified: false,
    role: "",
    __v: 0,
  });

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setIsLoggedIn(true);
        setData(res.data.data);
        setIsLoading(true);
      } catch (error: any) {
        setIsLoggedIn(false);
        setIsLoading(false);
        throw new Error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    console.log("re-rendered");

    fetchUser();
  }, []);

  return (
    <header className="flex justify-between items-center bg-lime-500 h-10 px-6">
      <div className="text-white">
        <Link href="/">SME Portal</Link>
      </div>
      <div className="text-white">
        {isLoggedIn ? (
          `Hi ${data.username}`
        ) : pathname !== "/login" ? (
          isLoading ? (
            "Loading"
          ) : (
            <Link href="/login">login</Link>
          )
        ) : (
          <Link href="/signup">Signup</Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
