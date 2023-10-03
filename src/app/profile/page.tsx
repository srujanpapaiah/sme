"use client";

import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Tag } = require("@cred/neopop-web/lib/components");

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    isVerified: false,
    username: "",
    role: "",
    __v: 0,
    _id: "",
  });
  const logoutHandle = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white py-8">
      <Toaster />

      <div className="profile-header text-center">
        <h1 className="text-3xl font-bold">
          {data.username === "" ? (
            "Loading"
          ) : (
            <Link href={`/profile/${data.username}`}>Hi, {data.username}</Link>
          )}
        </h1>
        <Tag
          colorConfig={{
            background: "#E6F9F1",
            color: "#06C270",
          }}
        >
          {data.role} support
        </Tag>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 shadow-md cursor-not-allowed">
          Edit Profile
        </button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 shadow-md cursor-not-allowed">
          Change Password
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md transform transition-transform duration-300 hover:scale-105 shadow-md">
          Log Out
        </button>
      </div>
    </div>
  );
}
