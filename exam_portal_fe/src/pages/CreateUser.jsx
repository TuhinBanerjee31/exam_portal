import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCheckbox from "../components/CustomCheckbox";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const CreateUser = () => {
  const [examsData, setExamsData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [statuses, setStatuses] = useState([
    { id: 1, label: "Order Placed", completed: false },
    { id: 2, label: "GST Bill & Study Material Sent", completed: false },
    { id: 3, label: "Pre-board Examination Scheduled", completed: false },
    { id: 4, label: "Pre-board Examination Completed", completed: false },
    {
      id: 5,
      label: "Soft Copy and Professional Certification Sent",
      completed: false,
    },
    {
      id: 6,
      label: "Video Tutorial and Online Classes Schedule Shared",
      completed: false,
    },
    { id: 7, label: "Final Onboard Exam Schedule", completed: false },
    { id: 8, label: "Final Onboard Exam Completed", completed: false },
    { id: 9, label: "PMI Number Issued", completed: false },
    {
      id: 10,
      label: "Hard Copy Delivered to Postal Address",
      completed: false,
    },
  ]);

  const toggleStatus = (id) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, completed: !status.completed } : status
      )
    );
  };

  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  const handleCheckboxChange = (id, isChecked) => {
    setExams(
      (prev) =>
        isChecked
          ? [...prev, id] // Add ID to the array if checked
          : prev.filter((item) => item !== id) // Remove ID if unchecked
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyUserInfo = { ...userInfo };
    copyUserInfo[name] = value;
    setUserInfo(copyUserInfo);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { email, username, password } = userInfo;
    if (!email || !username || !password) {
      return handleError("email, username, password are required");
    }

    const formattedExams = exams.map((item) => {
      let newObj = {
        examId: item,
        score: 0,
        status: false,
      };

      return newObj;
    });

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email,
          username,
          password,
          exams: formattedExams,
          orderStatus: statuses,
        }),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        // localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/admin/users");
        }, 1000);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExamsData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/exams`;
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setExamsData(result.exams);
      console.log(examsData);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExamsData();
  }, []);

  console.log(exams);
  console.log(statuses);

  return (
    <div>
      <Navbar />
      <form className="min-h-screen pt-24 pb-10" onSubmit={handleCreateUser}>
        <h1 className="text-center text-2xl font-semibold tracking-wide py-3">
          Create New User
        </h1>

        <div className="max-w-screen-lg mx-auto px-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              onChange={handleChange}
              value={userInfo.email}
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              onChange={handleChange}
              value={userInfo.username}
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={userInfo.password}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
        </div>

        <div className="py-14 max-w-screen-xl mx-auto px-4">
          <h1 className="text-center text-xl font-semibold tracking-wide py-3">
            Allot Exams To User
          </h1>

          <div className="flex flex-wrap gap-8 justify-center">
            {examsData &&
              examsData.map((item) => (
                <CustomCheckbox
                  key={item._id}
                  data={item}
                  onChange={handleCheckboxChange}
                />
              ))}
          </div>
        </div>

        <div className="py-5 flex items-center justify-center px-5">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-xl font-semibold mb-4 text-gray-800">
              Update User Order Status
            </h1>
            <ul className="space-y-3">
              {statuses.map((status) => (
                <li key={status.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`status-${status.id}`}
                    checked={status.completed}
                    onChange={() => toggleStatus(status.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`status-${status.id}`}
                    className={`ml-3 text-sm ${
                      status.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {status.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <button className="w-44 ml-4 self-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
            Submit
          </button>
        </div>
      </form>

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

export default CreateUser;
