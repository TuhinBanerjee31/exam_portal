import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [examDetails, setExamDetails] = useState({});

  const fetchUserData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/home`;
      const headers = {
        headers: {
          auth: localStorage.getItem("auth"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setUserData(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExamDetails = async (examId) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/examdetails`;
      const headers = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({ _id: examId }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      return result.examDetails?.title || "Unknown Exam";
    } catch (err) {
      handleError(err);
      return "Error fetching exam";
    }
  };

  const fetchAllExamDetails = async () => {
    if (!userData?.exams) return;

    const details = {};
    for (const exam of userData.exams) {
      const title = await fetchExamDetails(exam.examId);
      details[exam.examId] = title;
    }
    setExamDetails(details);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchAllExamDetails();
    }
  }, [userData]);

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-gray-100 px-6 py-24">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          {/* User Information */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile</h2>
            <p className="text-gray-600">Username: {userData?.username}</p>
            <p className="text-gray-600">Email: {userData?.email}</p>
          </div>

          {/* Exam Information */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Exams</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Exam</th>
                    <th className="py-2 px-4 border-b">Score</th>
                    <th className="py-2 px-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.exams.map((exam, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-center">
                        {examDetails[exam.examId] || "Loading..."}
                      </td>
                      <td className="py-2 px-4 border-b text-center">{exam.score}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {exam.status ? "Completed" : "Pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Status</h3>
            <ul className="space-y-4">
              {userData?.orderStatus.map((status) => (
                <li
                  key={status.id}
                  className={`flex items-center space-x-4 p-4 border rounded-lg shadow-sm ${
                    status.completed ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${
                      status.completed ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-gray-700">{status.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
      <Footer />
    </>
  );
};

export default Profile;
