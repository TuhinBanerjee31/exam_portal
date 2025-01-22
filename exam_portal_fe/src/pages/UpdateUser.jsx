import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCheckbox from "../components/CustomCheckbox";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UpdateUser = () => {
  const location = useLocation();
  console.log("state", location.state);
  const [examsData, setExamsData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    _id: location.state._id,
    email: location.state.email,
    username: location.state.username,
    password: location.state.password,
  });

  const [exams, setExams] = useState();
  const [statuses, setStatuses] = useState(location.state.orderStatus);

  const toggleStatus = (id) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, completed: !status.completed } : status
      )
    );
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (_id, isChecked) => {
    setExams(
      (prev) =>
        isChecked
          ? [...prev, _id] // Add ID to the array if checked
          : prev.filter((item) => item !== _id) // Remove ID if unchecked
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyUserInfo = { ...userInfo };
    copyUserInfo[name] = value;
    setUserInfo(copyUserInfo);
  };

  function containsObject(obj, item) {
    var i;
    for (i = 0; i < obj.length; i++) {
      if (obj[i].examId === item) {
        return {flag: true, id: i};
      }
    }

    return {flag: false, id: -1};
  }

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { _id, email, username, password } = userInfo;
    if (!email || !username || !password) {
      return handleError("email, username, password are required");
    }

    const formattedExams = exams.map((item) => {
      let newObj = {};
      const {flag, id} = containsObject(location.state.exams, item);

      if (flag) {
        newObj = {
          examId: location.state.exams[id].examId,
          score: location.state.exams[id].score,
          status: location.state.exams[id].status,
        };
      } else {
        newObj = {
          examId: item,
          score: 0,
          status: false,
        };
      }

      return newObj;
    });

    console.log("formattedExams ", formattedExams);

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id,
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

  const setExamsState = async () => {
    let arr = location.state.exams.map((item) => {
      return item.examId;
    });

    setExams(arr);
  };

  useEffect(() => {
    fetchExamsData();
    setExamsState();
  }, []);

  console.log(exams);

  return (
    <div>
      <Navbar />
      <form className="min-h-screen pt-24 pb-10" onSubmit={handleCreateUser}>
        <h1 className="text-center text-2xl font-semibold tracking-wide py-3">
          Update User Profile
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
                  checked={exams.includes(item._id)}
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

export default UpdateUser;
