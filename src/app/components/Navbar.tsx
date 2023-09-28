"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Form from "./Form";

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
  const [modalVisible, setModalVisible] = useState(false);

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

  const openModal = () => {
    setModalVisible(true);
  };

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
    <div className="bg-[#242526] h-16 px-6 flex justify-between items-center">
      <Toaster />
      <div>
        <Link href="/" className="text-white font-bold text-xl">
          SME Portal
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Link href="/rules" className="text-white">
              Rules
            </Link>
            <Link href="/latest" className="text-white">
              Latest
            </Link>
          </div>
        ) : null}
      </div>
      <div className="flex items-center relative">
        {isLoggedIn ? (
          <div>
            <Form
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              data={data}
            />
            <button
              className="mr-8 px-4 py-2 text-[#E6E9EC] text-[#B8BBBF] bg-[#4E4F50] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300"
              onClick={openModal}
            >
              New Issue
            </button>
            <button
              className="cursor-pointer text-white"
              onClick={toggleDropdown}
            >
              Hi {data.username} &#9662;
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-[#242526] text-black shadow-md mt-1 p-2 rounded-lg w-48 z-10">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-[#E6E9EC] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300"
                >
                  Profile
                </Link>
                <hr className="my-2 border-gray-300" />
                <button
                  onClick={() => {
                    toggleDropdown();
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-[#E6E9EC] hover:bg-[#3A3B3C] rounded-lg focus:outline-none transition-all duration-300"
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
            <Link href="/login" className="text-white">
              Login
            </Link>
          )
        ) : (
          <Link href="/signup" className="text-white">
            Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
