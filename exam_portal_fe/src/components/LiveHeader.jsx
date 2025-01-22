import React from "react";

const LiveHeader = (props) => {
  return (
    <div className="bg-white max-w-screen-md shadow-lg rounded-lg p-6 border-t-4 border-purple-600">
        <div className=" mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {props.data.title}
          </h1>
        </div>
        <div className="text-right">
          <span className="bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full">
            Total Mark: {props.data.totalMarks}
          </span>
        </div>
        <div className="mt-6">
          <div className="bg-red-100 border border-red-300 rounded-md p-4">
            <p className="text-red-600 text-sm flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8 8-3.582 8-8z"
                  />
                </svg>
              </span>
              Please don't close or refresh this tab. If you do, your exam will
              end with a score of 0, and you won't be able to retake it.
            </p>
          </div>
        </div>
      </div>
  );
};

export default LiveHeader;