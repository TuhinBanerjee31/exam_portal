import React from "react";
import {
  UserIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const UserCard = (props) => {

  const deleteUser = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`;
      const headers = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ _id: props.data._id }),
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        // localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <UserIcon class="h-10 w-10 text-gray-500" />
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-wider text-gray-900 dark:text-white">
          {props.data.username}
        </h5>
      </div>
      <p className="mb-3 font-normal text-gray-500 tracking-wider dark:text-gray-400">
        Total Exams Alloted: {props.data.exams.length}
      </p>
      <div className="flex font-medium items-center gap-4 justify-around pt-2 text-blue-600 hover:underline">
        <Link to={"/admin/view-user"} state={props.data}><EyeIcon class="h-6 w-6" /></Link>
        <Link to="/admin/update-user" state={props.data}>
          <PencilSquareIcon class="h-6 w-6" />
        </Link>
        <TrashIcon class="h-6 w-6 cursor-pointer" onClick={deleteUser} />
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

export default UserCard;
