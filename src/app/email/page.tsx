"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spreadsheet } from "react-spreadsheet";
import Link from "next/link";
import { RenderAnalytics } from "./analytics";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
const { Button } = require("@cred/neopop-web/lib/components");

export default function Home() {
  const router = useRouter();
  const [tableData, setTableData] = useState<Array<Array<{ value: string }>>>(
    []
  );
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendBaseURL = "https://gold-bright-trout.cyclic.app";

  const loadingMessage = (
    <div className="flex justify-center items-center h-screen ">
      <h1 className="text-white text-2xl">Loading...</h1>
    </div>
  );

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/me");
        if (
          res.data.data.role === "user" ||
          res.data.data.role === "doubt" ||
          res.data.data.role === "discord" ||
          res.data.data.role === "assignment"
        ) {
          toast.error("Not authorized");
          router.push("/");
        }
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${backendBaseURL}/getAll/${name}?date=${startDate}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();

      setTableData(
        result?.map((item: { [s: string]: unknown }) => {
          return Object.values(item).map((d, i) => {
            if (dayjs(d as string).isValid()) {
              return {
                value: dayjs(d as string).format("DD/MM/YYYY"),
              };
            }
            return { value: (d as string | number).toString() };
          });
        }) || []
      );
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [name, startDate]);

  return (
    <div>
      <Toaster />
      {loading ? (
        loadingMessage
      ) : (
        <div className="my-10 flex justify-between items-center px-6">
          <select
            style={{ padding: 10 }}
            onChange={(e) => setName(e.target.value)}
            className="rounded"
          >
            <option value="">Select SME</option>
            <option value="Srujan Papaiahgari">Srujan Papaiahgari</option>
            <option value="Parag">Parag</option>
            <option value="Aman Kumar">Aman Kumar</option>
            <option value="Vidya Sagar">Vidya Sagar</option>
            <option value="Yashraj">Yashraj</option>
            <option value="Thomas">Thomas</option>
            <option value="Sanjay">Sanjay</option>{" "}
          </select>
          <div>
            <button
              onClick={() => {
                setStartDate(dayjs(startDate).subtract(1, "day").toDate());
              }}
              className=" text-left px-4 py-2 text-[#E6E9EC] bg-[#3A3B3C] rounded-lg focus:outline-none transition-all duration-300"
            >
              &lt;
            </button>
            <DatePicker
              dateFormat={"dd/MM/yyyy"}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date as Date);
              }}
              className=" mx-2 py-2 text-center rounded-md"
            />
            <button
              onClick={() => {
                setStartDate(dayjs(startDate).add(1, "day").toDate());
              }}
              className=" text-left px-4 py-2 text-[#E6E9EC] bg-[#3A3B3C] rounded-lg focus:outline-none transition-all duration-300"
            >
              &gt;
            </button>
          </div>
          <div className="flex gap-2">
            <div>
              <Button
                colorMode="light"
                kind="elevated"
                onClick={getData}
                size="big"
              >
                Refetch
              </Button>
            </div>
            ;
            <Button
              colorConfig={{
                backgroundColor: "#0d0d0d",
                borderColor: "#E5FE40",
                color: "#ffffff",
                disabledColors: {
                  backgroundColor: "#8A8A8A",
                  color: "rgba(255,255,255, 0.5)",
                  edgeColors: {
                    bottom: "#E0E0E0",
                    left: "transparent",
                    right: "#EFEFEF",
                    top: "transparent",
                  },
                },
                edgeColors: {
                  bottom: "#67721F",
                  left: "transparent",
                  right: "#A2B42D",
                  top: "transparent",
                },
              }}
              colorMode="dark"
              kind="elevated"
              size="big"
              variant="secondary"
            >
              <Link href="/detail">Detail</Link>
            </Button>
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !name && <RenderAnalytics tableData={tableData} />}
      {!loading && (
        <div className="text-center">
          <Spreadsheet darkMode data={tableData} />
        </div>
      )}
    </div>
  );
}
