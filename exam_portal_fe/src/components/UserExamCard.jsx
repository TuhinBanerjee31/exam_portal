import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UserExamCard = (props) => {
  const [examDetails, setExamDetails] = useState();

  const fetchExamDetails = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/examdetails`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ _id: props.data.examId }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setExamDetails(result.examDetails);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamDetails();
    // console.log(examDetails);
  }, []);

  console.log(examDetails);

  return (
    <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {examDetails && examDetails.title}
        </h5>
        <p className="mb-2 text-base tracking-tight text-gray-900 dark:text-white">
          Total Marks: {examDetails && examDetails.totalMarks}
        </p>
        <p className="mb-2 text-base tracking-tight text-gray-900 dark:text-white">
          Total Questions: {examDetails && examDetails.data.length}
        </p>
      </div>
      <div className="flex justify-between pt-4 gap-5">
        {!props.data.status ? (
          <Link
            to="/live"
            state= {examDetails}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start Exam
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-400 bg-gray-300 rounded-lg cursor-not-allowed">
            Start Exam
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </span>
        )}
        <button
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg ${
            props.data?.status ? "bg-green-500" : "bg-gray-500"
          }`}
          aria-label={props.data?.status ? "Completed" : "Yet to complete"}
        >
          {props.data?.status ? "Completed" : "Yet to complete"}
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserExamCard;
