import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExamDetails from "../components/ExamDetails";
import {UserCircleIcon} from "@heroicons/react/24/outline";
import OrderStatusTracker from "../components/OrderStatusTracker";

const ViewUser = () => {
  const location = useLocation();
  console.log("state", location.state);

  const [userInfo, setUserInfo] = useState({
    _id: location.state._id,
    email: location.state.email,
    username: location.state.username,
    password: location.state.password,
  });

  const [exams, setExams] = useState(location.state.exams);
  const [statuses, setStatuses] = useState(location.state.orderStatus);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-10">
        <div className="max-w-screen-xl mx-auto py-5">
        <UserCircleIcon class="h-14 w-14 text-gray-500" />
        <h1 className="text-4xl">{userInfo.username},</h1>
        </div>

        <div className="my-10 px-5">
          <h2 className="max-w-screen-xl mx-auto text-xl">Exams Alloted</h2>
          <div className="flex flex-wrap max-w-screen-xl mx-auto gap-5 py-4">
          {exams.map(item => (
            <ExamDetails key={item.examId} data={item} />
          ))}
          </div>
        </div>

        <div className="my-10 px-5">
        <h2 className="max-w-screen-xl mx-auto text-xl">Order Status</h2>

        <div className="max-w-screen-xl mx-auto py-4">
        {statuses.map((step, index) => (
          <OrderStatusTracker key={step.id} step={step} isLast={index === statuses.length - 1} />
        ))}
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewUser;
