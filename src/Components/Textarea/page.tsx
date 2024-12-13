import React from "react";

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  rows?: number;
  cols?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  placeholder = "",
  value,
  required = false,
  rows = 4,
  cols = 50,
  onChange,
  className = "",
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      required={required}
      rows={rows}
      cols={cols}
      onChange={onChange}
      className={`border border-gray-300 p-2 w-full rounded ${className}`}
    />
  );
};

export default Textarea;
