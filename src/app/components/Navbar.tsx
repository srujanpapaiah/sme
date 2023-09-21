"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

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
        const res = await axios.get("/api/users/me");
        setIsLoggedIn(true);
        setData(res.data.data);
        setIsLoading(false); // Set isLoading to false when data is fetched successfully.
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        // Handle error gracefully if needed.
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
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <header className="flex justify-between items-center bg-lime-500 h-10 px-6">
      <Toaster />

      <div className="text-white">
        <Link href="/">SME Portal</Link>
      </div>
      <div className="text-white relative">
        {isLoggedIn ? (
          <div>
            <button className="cursor-pointer" onClick={toggleDropdown}>
              Hi {data.username} &#9662;{" "}
              {/* Display a down arrow for the dropdown */}
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black shadow-md mt-1 p-2 rounded-lg">
                <Link href="/profile">Profile</Link>
                <button
                  onClick={() => {
                    toggleDropdown();
                    handleLogout();
                  }}
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
    </header>
  );
};

export default Navbar;
