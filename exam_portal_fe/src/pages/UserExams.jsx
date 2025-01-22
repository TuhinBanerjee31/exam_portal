import React, { useState, useEffect } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import UserExamCard from "../components/UserExamCard";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UserExams = () => {
  const [userData, setUserData] = useState();

  const fetchUserData = async () => {
    try {
      const url = "http://localhost:3000/api/user/home";
      const headers = {
        headers: {
          auth: localStorage.getItem("auth"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setUserData(result.data);
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log(userData);
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="min-h-screen pt-24">
        <h1 className="text-xl pl-4 mt-10">
          Welcome, {userData && userData.username}
        </h1>
        <h1 className="text-center text-2xl font-semibold tracking-wide py-3">
          Alotted Exams
        </h1>

        <div className="flex flex-wrap max-w-screen-xl justify-around gap-5 items-center mx-auto py-8">
          {userData && userData.exams &&
            userData.exams.map((item) => (<UserExamCard key={item.examId} data={item} />))}
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
    </div>
  );
};

export default UserExams;
