import React from "react";

const CustomCheckbox = (props) => {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    // Notify the parent about the change
    if (props.onChange) {
      props.onChange(props.data._id, isChecked);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center h-5">
        <input
          id={props.data._id}
          type="checkbox"
          checked={props.checked} // Use the prop passed from the parent
          onChange={handleChange} // Notify parent of changes
          value={props.data._id}
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        />
      </div>
      <label
        htmlFor={props.data._id}
        className="text-lg font-medium text-gray-900"
      >
        {props.data.title}
      </label>
    </div>
  );
};

export default CustomCheckbox;
