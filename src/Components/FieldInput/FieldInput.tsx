import Input from "../Input/Input";
import Label from "../Label/Label";

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // value: string | boolean;
}
const FieldInput = ({
  label,
  type,
  name,
  value,
  // isrequired = true,
  ...props
}: FieldInputProps) => {
  // console.log("isrequired", isrequired);
  return (
    <div className="my-2 flex justify-end">
      <Label label={label} />
      <Input type={type} name={name} value={value} {...props} />
    </div>
  );
};

export default FieldInput;
