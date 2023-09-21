"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spreadsheet } from "react-spreadsheet";
import Card from "../components/emailCard";
import Link from "next/link";
import { RenderAnalytics } from "./analytics";

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // New error state

  const backendBaseURL = "https://gold-bright-trout.cyclic.app";

  const getData = async () => {
    setLoading(true); // Set loading to true while fetching data
    setError(null); // Reset error state

    try {
      const response = await fetch(
        backendBaseURL + "/getAll/" + name + "?date=" + startDate,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json();

      setTableData(
        result?.map((item: { [s: string]: unknown } | ArrayLike<unknown>) => {
          return Object.values(item).map((d, i) => {
            if (dayjs(d).isValid()) {
              return {
                value: dayjs(d).format("DD/MM/YYYY"),
              };
            }
            return { value: d };
          });
        })
      );
    } catch (error: any) {
      setError(error.message); // Set error state if there's an error
    } finally {
      setLoading(false); // Set loading back to false after fetching
    }
  };

  useEffect(() => {
    getData();
  }, [name, startDate]);

  return (
    <div>
      <div className="my-10 flex justify-between items-center px-6">
        <select
          style={{ padding: 10 }}
          onChange={(e) => setName(e.target.value)}
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
            className="border border-green-500 hover:border-green-600 text-white  hover:bg-green-600 px-4 py-2 rounded"
          >
            &lt;
          </button>
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            selected={startDate}
            onChange={(date) => {
              console.log(date);
              setStartDate(date);
            }}
            className="border border-green-500 mx-2 py-2 text-center rounded-md"
          />
          <button
            onClick={() => {
              setStartDate(dayjs(startDate).add(1, "day").toDate());
            }}
            className="border border-green-500 hover:border-green-600 text-white  hover:bg-green-600 px-4 py-2 rounded "
          >
            &gt;
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={getData}
            className="p-2 border border-green-500 hover:border-green-600 rounded text-white"
          >
            Refetch
          </button>
          <button className="p-2  border border-green-500 hover:border-green-600 rounded text-white">
            <Link href="/detail">Detail</Link>
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}{" "}
      {!loading && !error && !name && <RenderAnalytics tableData={tableData} />}
      <div className="text-center l">
        <Spreadsheet darkMode data={tableData} />
      </div>
    </div>
  );
}
