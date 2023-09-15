"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        setIsLoggedIn(true);
        setData(res.data.data);
      } catch (error: any) {
        setIsLoggedIn(false);
        throw new Error(error.message);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center bg-lime-500 h-10">
        <div className="text-white">SME Portal</div>
        <div className="text-white">
          {isLoggedIn ? `Hi ${data.username}` : "Login"}
        </div>
      </div>
    </>
  );
};

export default Navbar;
