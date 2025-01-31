import React, { useState } from "react";

const QuestionCard = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedIndex(index);
    if (props.data.correctOption == index+1) {
      props.marksHandler(props.data.marks); // Add marks if the selected option is correct
    }
  };

  return (
    <div className="bg-white w-2/4 shadow-lg rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-purple-700">
          <span className="font-bold">{props.current}</span>/{props.total}
        </div>
        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
          Mark: {props.data.marks}
        </span>
      </div>
      <div className="mb-6">
        <p className="text-gray-800 text-lg font-medium">
          {props.data.question}
        </p>
      </div>
      <div className="space-y-4">
        {props.data.options.map((option, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name={`question-${props.current}`}
              className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500"
              checked={selectedIndex === index}
              onChange={() => handleOptionChange(index)}
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
