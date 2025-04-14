import React, { useState, useEffect } from "react";
import LiveHeader from "../components/LiveHeader";
import QuestionCard from "../components/QuestionCard";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Live = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [marksObtain, setMarksObtain] = useState(0);
  const [userData, setUserData] = useState();

  const marksHandler = (marks) => {
    setMarksObtain((prev) => prev + parseInt(marks));
  };

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

  const handleUpdateUser = async (score = marksObtain, status = true) => {
    try {
      const { _id, email, username, password, orderStatus } = userData;

      const formattedExams = userData.exams.map((item) => {
        if (item.examId === location.state._id) {
          return {
            examId: item.examId,
            score,
            status,
          };
        } else {
          return {
            examId: item.examId,
            score: item.score,
            status: item.status,
          };
        }
      });

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/update`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
        body: JSON.stringify({
          _id,
          email,
          username,
          password,
          exams: formattedExams,
          orderStatus,
        }),
      });

      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/courses");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUserData();

    // Add event listener to detect page reload
    const handleBeforeUnload = (event) => {
      handleUpdateUser(0, true); // Submit form with score 0 and status true
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userData]); // Dependency array includes userData to ensure updated state

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateUser();
      }}
      className="bg-purple-100 min-h-screen flex flex-col items-center py-10 gap-8"
    >
      <LiveHeader data={location.state} />
      {location.state.data.map((item, index) => (
        <QuestionCard
          key={index}
          current={index + 1}
          marksHandler={marksHandler}
          total={location.state.data.length}
          data={item}
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
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
    </form>
  );
};

export default Live;
