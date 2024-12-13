import React from "react";

interface checkBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const CheckBox = ({ id, checked, onChange }: checkBoxProps) => {
  return (
    <input
      className="mr-1"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default CheckBox;
