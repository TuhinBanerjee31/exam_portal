import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredusers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const fetchUsersData = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`;
      const headers = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setAllUsers(result.allUsers);
      console.log(allUsers);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen">
        <div className="pt-24 w-full px-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-screen-sm mx-auto"
          >
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <Link
              to={"/admin/create-user"}
              className="w-44 ml-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              New User
            </Link>
          </form>
        </div>

        <div className="max-w-screen-2xl mx-auto py-8">
          <h1 className="text-center text-2xl font-semibold tracking-wide py-3">
            All Users
          </h1>
          <div className="flex flex-wrap gap-5 justify-center">
            {filteredusers.map((item) => (
              <UserCard key={item._id} data={item} />
            ))}

            {filteredusers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">
                  No user found
                </h3>
                <p className="text-gray-400 mt-2">
                  Try a different search term
                </p>
              </div>
            )}
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
      </div>
      <Footer />
    </div>
  );
};

export default Users;
