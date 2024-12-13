interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  label: string;
  onClick?: () => void;
}

const Button = ({
  className = "",
  variant = "primary",
  label,
  type = "button",
  onClick,
  ...props
}: ButtonProps) => {
  const buttonStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-green-700 text-white hover:bg-green-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
  } as const;

  return (
    <button
      className={`text-center w-full py-1 ${buttonStyles[variant]} ${className}`}
      type="submit"
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
