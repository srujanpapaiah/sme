"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();

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

  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (path !== "/login" && path !== "/signup") {
          const res = await axios.get("/api/users/me");
          setData(res.data.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        // Handle error gracefully if needed.
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      setIsLoggedIn(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center bg-lime-500 h-10 px-6">
      <Toaster />

      <div>
        <Link href="/">
          <strong>SME Portal</strong>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div>
            <Link href="/rules">
              <strong>Rules</strong>
            </Link>
          </div>
        ) : null}
      </div>
      <div className=" z-10">
        {isLoggedIn ? (
          <div>
            <button className="cursor-pointer" onClick={toggleDropdown}>
              <strong> Hi {data.username} &#9662; </strong>
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black shadow-md mt-1 p-2 rounded-lg w-48">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-blue-100 hover:text-blue-500 transition-all duration-300"
                >
                  Profile
                </Link>
                <hr className="my-2 border-gray-300" />
                <button
                  onClick={() => {
                    toggleDropdown();
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg focus:outline-none transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : pathname !== "/login" ? (
          isLoading ? (
            "Loading"
          ) : (
            <Link href="/login">Login</Link>
          )
        ) : (
          <Link href="/signup">Signup</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
