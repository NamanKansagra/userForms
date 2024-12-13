interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-blue-700 border-b-2 border-r-2 p-4"
    >
      {children}
    </form>
  );
};

export default Form;
