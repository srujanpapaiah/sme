import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Form = ({ modalVisible, setModalVisible, data }) => {
  const [ticketData, setTicketData] = useState<{
    creator: string;
    creatorId: string;
    department: string;
    subject: string;
    description: string;
    priority: string;
    date: Date;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseEnrolled: string;
    courseInvoice: String;
  }>({
    creator: data.username,
    creatorId: data._id,
    department: data.role,
    subject: "",
    description: "",
    priority: "low",
    date: new Date(),
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    courseEnrolled: "",
    courseInvoice: "",
  });

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

  const ticketSubmitHandle = async (e: any) => {
    e.preventDefault();
    console.log(ticketData);
    try {
      const response = await axios.post("/api/tickets/form", ticketData);
      toast.success("Ticket Created Successfully!");
      setModalVisible(false);
      setTicketData({
        creator: data.username,
        creatorId: data._id,
        department: data.role,
        subject: "",
        description: "",
        priority: "low",
        date: new Date(),
        studentName: "",
        studentEmail: "",
        studentPhone: "",
        courseEnrolled: "",
        courseInvoice: "",
      });
    } catch (error: any) {
      toast.error("Error occured while submitting ticket");
      console.log(error.response);
    }
  };

  const handleFileUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setTicketData({ ...ticketData, courseInvoice: base64 });
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      {modalVisible && (
        <div
          className="h-screen flex justify-center items-center overlay top-0 left-0 right-0 bottom-0 fixed z-50 p-16 inset-0 overflow-auto bg-black bg-opacity-40"
          onClick={handleOverlayClick}
        >
          <Toaster />
          <div className="bg-[#242526] p-6 rounded-lg shadow-md w-3/6 mt-80">
            <button
              className="close text-[#B0B4B7] bg-[#4E4F50] rounded-full float-right text-3xl font-bold hover:text-black cursor-pointer focus:text-black focus:outline-none"
              onClick={closeModal}
              style={{ width: "40px", height: "40px" }}
            >
              &times;
            </button>
            <h1 className="text-3xl text-[#CDD0D4] text-center font-bold">
              Raise a Ticket
            </h1>

            <form action="#" method="post" encType="multipart/form-data">
              {/* Ticket Subject */}
              <div className="mb-4">
                <label
                  htmlFor="issue_subject"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Subject
                </label>
                <select
                  id="issue_subject"
                  name="issue_subject"
                  value={ticketData.subject}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, subject: e.target.value })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                >
                  <option value="">---</option>
                  <option value="Access Not Received">
                    Access Not Received
                  </option>
                  <option value="Email Not Verified">Email Not Verified</option>
                  <option value="Resume Discussion">Resume Discussion</option>
                </select>
              </div>

              {/* Ticket Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={ticketData.description}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                ></textarea>
              </div>

              {/* Ticket Priority */}
              <div className="mb-4">
                <label
                  htmlFor="priority"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={ticketData.priority}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, priority: e.target.value })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                >
                  <option value="low">Low</option>
                  <option value="medium" className="text-[#538ef5]">
                    Medium
                  </option>
                  <option value="high" className="text-[#fd5a5a]">
                    High
                  </option>
                </select>
              </div>

              {/* Ticekt date */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                  value={
                    ticketData.date
                      ? ticketData.date.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      date: new Date(e.target.value),
                    })
                  }
                />
              </div>

              {/* Student Name */}
              <div className="mb-4">
                <label
                  htmlFor="student_name"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  id="student_name"
                  name="student_name"
                  value={ticketData.studentName}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      studentName: e.target.value,
                    })
                  }
                  className="w-full bg-[#3A3B3C]  text-[#B0B3B8] border rounded-md py-2 px-3"
                />
              </div>

              {/* Student Email */}
              <div className="mb-4">
                <label
                  htmlFor="student_email"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Student Email
                </label>
                <input
                  type="email"
                  id="student_email"
                  name="student_email"
                  value={ticketData.studentEmail}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      studentEmail: e.target.value,
                    })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                />
              </div>

              {/* Student Phone */}
              <div className="mb-4">
                <label
                  htmlFor="student_phone"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Student Phone
                </label>
                <input
                  type="tel"
                  id="student_phone"
                  name="student_phone"
                  value={ticketData.studentPhone}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      studentPhone: e.target.value,
                    })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                />
              </div>

              {/* Course Enrolled */}
              <div className="mb-4">
                <label
                  htmlFor="course_enrolled"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Course Enrolled
                </label>
                <select
                  id="course_enrolled"
                  name="course_enrolled"
                  value={ticketData.courseEnrolled}
                  onChange={(e) =>
                    setTicketData({
                      ...ticketData,
                      courseEnrolled: e.target.value,
                    })
                  }
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                >
                  <option value="">Select a Course</option>
                  <option value="course1">Web Development</option>
                  <option value="course2">Data Science</option>
                  <option value="course3">Java</option>
                </select>
              </div>

              {/* Course Invoice */}
              <div className="mb-4">
                <label
                  htmlFor="course_invoice"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Course Invoice
                </label>
                <input
                  type="file"
                  id="course_invoice"
                  name="course_invoice"
                  onChange={(e) => handleFileUpload(e)}
                  className="w-full bg-[#3A3B3C] text-[#B0B3B8] border rounded-md py-2 px-3"
                />
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={ticketSubmitHandle}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
