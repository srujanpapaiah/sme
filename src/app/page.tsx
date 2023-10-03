"use client";

import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

export default function Home() {
  // console.log("Page hello");

  useEffect(() => {
    console.log("jkgaskd");
  }, []);
  return (
    <>
      <button onClick={() => window.alert("Hello")}>CLG</button>
      <h1>Hello</h1>
      {/* <Dashboard /> */}
    </>
  );
}
