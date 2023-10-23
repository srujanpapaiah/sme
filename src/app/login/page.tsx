"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // Initialize the state on the server
  useEffect(() => {
    if (typeof window === "undefined") {
      setUser({
        email: "",
        password: "",
      });
    }
  }, []);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/user/login", user);
      const userData = response.data.data;
      toast.success("Login Success");
      if (response) {
        localStorage.setItem("token", userData.token);
      }
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-lime-600 text-black"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onLogin}
          className="w-full bg-lime-500 text-white p-2 rounded-lg focus:outline-none hover:bg-lime-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-4 text-lime-500 text-center">
          Not registered yet?{" "}
          <Link href="/signup" className="text-lime-700">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
