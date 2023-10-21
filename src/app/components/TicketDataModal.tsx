import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const TicketDataModal = ({ modalVisible, setModalVisible, data }) => {
  const handleOverlayClick = (event: {
    target: { classList: { contains: (arg0: string) => any } };
  }) => {
    if (event.target.classList.contains("overlay")) {
      closeModal();
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "two-digit",
    minute: "two-digit",
    second: "two-digit",
  };

  return (
    <>
      {modalVisible && (
        <div
          className="h-screen flex justify-center items-center overlay top-0 left-0 right-0 bottom-0 fixed z-50 p-16 inset-0 overflow-auto bg-black bg-opacity-40"
          onClick={handleOverlayClick}
        >
          <Toaster />
          <div className="bg-[#242526] p-6 rounded-lg shadow-md w-10/12 mt-20">
            <button
              className="close text-[#B0B4B7] bg-[#4E4F50] rounded-full float-right text-3xl font-bold hover:text-black cursor-pointer focus:text-black focus:outline-none"
              onClick={closeModal}
              style={{ width: "40px", height: "40px" }}
            >
              &times;
            </button>
            <h1 className="text-3xl text-[#CDD0D4] text-center font-bold mb-4">
              Ticket Info
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="mr-8 px-4 py-2 text-[#E6E9EC]  bg-[#4E4F50] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Ticket Creator:</h3>
                  <h2 className="text-xl text-[#CDD0D4]">{data.creator}</h2>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Department:</h3>
                  <h2 className="text-xl text-[#CDD0D4]">{data.department}</h2>
                </div>
              </div>
              <div className="mr-8 px-4 py-2 text-[#E6E9EC]  bg-[#4E4F50] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300">
                <div className="mb-4 flex gap-2 items-center">
                  <h3 className="text-lg font-semibold">Subject:</h3>
                  <p className="text-[#CDD0D4]">{data.subject}</p>
                </div>
                <div className="mb-4 flex gap-2 ">
                  <h3 className="text-lg font-semibold">Description:</h3>
                  <p>{data.description}</p>
                </div>
                <div className="mb-4 flex gap-2 items-center">
                  <h3 className="text-lg font-semibold">Priority:</h3>
                  <p>{data.priority}</p>
                </div>
                <div className="mb-4 flex gap-2">
                  <h3 className="text-lg font-semibold">Date:</h3>
                  <p>{data.date.toLocaleString(options)}</p>
                </div>
              </div>
              <div className="mr-8 px-4 py-2 text-[#E6E9EC]  bg-[#4E4F50] hover:bg-[#3A3B3C] rounded-lg transition-all duration-300">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">
                    Student Information:
                  </h3>
                  <p>Name: {data.studentName}</p>
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${data.studentEmail}`}
                      className="text-[#7188ef]"
                    >
                      {data.studentEmail}
                    </a>
                  </p>
                  <p>
                    {" "}
                    Phone:{" "}
                    <a
                      href={`tel:${data.studentPhone}`}
                      className="text-[#7188ef]"
                    >
                      {data.studentPhone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4 flex gap-2 items-center">
                <h3 className="text-lg font-semibold">Course Enrolled:</h3>
                <p>{data.courseEnrolled}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 h-auto">
                  <h3 className="text-lg font-semibold">Course Invoice:</h3>
                  <img
                    src={data.courseInvoice}
                    alt="Course Invoice"
                    className="mt-2 max-w-full h-auto border border-[#CDD0D4]"
                  />
                </div>
                <div className="w-1/2">
                  <h3 className="text-lg font-semibold">Issue Image:</h3>
                  <img
                    src={data.courseInvoice}
                    alt="Course Invoice"
                    className="mt-2 max-w-full h-auto border border-[#CDD0D4]"
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketDataModal;
