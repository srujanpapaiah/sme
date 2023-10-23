"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function Signup() {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // Initialize the state on the server
  useEffect(() => {
    if (typeof window === "undefined") {
      setUser({
        username: "",
        email: "",
        password: "",
      });
    }
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async () => {
    setIsLoading(true);
    try {
      // if (path !== "/signup") {
      const response = await axios.post("/api/users/signup", user);
      toast.success("Successfully Registered!");
      localStorage.setItem("userInfo", JSON.stringify(response));
      router.push("/login");
      // }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.status == 400) {
        toast.error("User Already Exists");
      } else {
        toast.error("An error occured during signup.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Enable the Signup button only when all fields have values
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <label htmlFor="username" className="mb-1">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        {/* <label htmlFor="role" className="mb-1">
          {" "}
          Role
        </label> */}
        {/* <select
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          id="role"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          required
        >
          <option value="user"></option>
          <option value="email">Email</option>
          <option value="doubt">Doubts</option>
          <option value="discord">Discord</option>
          <option value="assignment">Assignments</option>
          <option value="revechat">Reve Chat</option>
        </select> */}

        <label htmlFor="password" className="mb-1">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          className="w-full bg-lime-500 text-white p-2 rounded-lg focus:outline-none hover:bg-lime-600"
          disabled={buttonDisabled || isLoading}
        >
          {isLoading ? "Signing up..." : "Signup"}
        </button>
        <p className="mt-4 text-lime-500 text-center">
          Already signed up?{" "}
          <Link href="/login" className="text-lime-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
