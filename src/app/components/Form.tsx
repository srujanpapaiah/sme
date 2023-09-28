import React, { useEffect, useState } from "react";

const Form = ({ modalVisible, setModalVisible, data }) => {
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

  return (
    <>
      {modalVisible && (
        <div
          className="h-screen flex justify-center items-center overlay top-0 left-0 right-0 bottom-0 fixed z-50 p-16 inset-0 overflow-auto bg-black bg-opacity-40"
          onClick={handleOverlayClick}
        >
          <div className="bg-[#3A3B3C] p-6 rounded-lg shadow-md w-3/6 mt-80">
            <button
              className="close text-gray-500 float-right text-2xl font-bold hover:text-black focus:text-black focus:outline-none"
              onClick={closeModal}
            >
              &times;
            </button>
            <form action="#" method="post" encType="multipart/form-data">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.username}
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3 text-[#B0B3B8]"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="department"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value="Engineering"
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="issue_subject"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Issue Subject
                </label>
                <select
                  id="issue_subject"
                  name="issue_subject"
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                >
                  <option value=""></option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="issue_content"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Issue Content
                </label>
                <textarea
                  id="issue_content"
                  name="issue_content"
                  rows="4"
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="issue_severity"
                  className="block text-[#CDD0D4] font-semibold"
                >
                  Issue Severity
                </label>
                <select
                  id="issue_severity"
                  name="issue_severity"
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                  value="2023-09-28"
                />
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                />
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                />
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                />
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                >
                  <option value="">Select a Course</option>
                  <option value="course1">Course 1</option>
                  <option value="course2">Course 2</option>
                  <option value="course3">Course 3</option>
                </select>
              </div>

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
                  className="w-full bg-[#3A3B3C] border rounded-md py-2 px-3"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
