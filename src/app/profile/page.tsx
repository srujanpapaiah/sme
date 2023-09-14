"use client";

import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    isVerified: false,
    username: "",
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <p>
        {data.username === "" ? (
          "Loading"
        ) : (
          <Link href={`/profile/${data._id}`}>Hi {data.username}</Link>
        )}
      </p>
      <button
        onClick={logoutHandle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
