const Label = ({ label }: { label?: string }) => {
  return <>{!!label && <label className="p-2">{label}</label>}</>;
};

export default Label;
