import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import {
  QuestionMarkCircleIcon,
  ArrowUturnRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const ExamDetails = (props) => {
  const [examData, setExamData] = useState();

  const fetchExamDetails = async () => {
    try {
      const url = "http://localhost:3000/api/admin/examdetails";
      const options = {
        method: "POST", // Assuming it's a POST request based on the presence of a body
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: props.data.examId }),
      };
      const response = await fetch(url, options);

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! Status: ${response.status}`);
      //   }

      const result = await response.json();
      setExamData(result.examDetails);
      console.log("examData: ", result.examDetails);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  return (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <QuestionMarkCircleIcon className="h-10 w-10 text-gray-500" />
      {examData ? (
        <>
          <h5 className="mb-2 text-2xl font-semibold tracking-wider text-gray-900 dark:text-white">
            {examData.title}
          </h5>
          <p className="mb-3 font-normal text-gray-500 tracking-wider dark:text-gray-400">
            Total Questions: {examData.data.length}
          </p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      )}
      <p className="mb-3 font-normal text-gray-500 tracking-wider dark:text-gray-400">
        Score: {props.data?.score}
      </p>
      <p
        className="mb-3 font-normal text-gray-500 tracking-wider dark:text-gray-400"
        style={{
          color: props.data?.status ? "green" : "orange",
        }}
      >
        Status: {props.data?.status === true ? "Completed" : "In Progress"}
      </p>
      <div className="flex font-medium items-center gap-4 justify-around pt-2 text-blue-600 hover:underline">
        <ArrowUturnRightIcon class="h-6 w-6" />
        <TrashIcon class="h-6 w-6 cursor-pointer" />
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

export default ExamDetails;
