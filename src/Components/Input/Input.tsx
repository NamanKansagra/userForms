import React from "react";

const Input = ({ ...props }) => {
  const { required = true } = props;
  //   console.log("required", isrequired);
  return (
    <input
      className="justify-center w-full bg-slate-700 rounded p-2 mb-2"
      {...props}
      required={required}
    />
  );
};

export default Input;
