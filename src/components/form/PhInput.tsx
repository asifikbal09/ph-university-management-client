import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputForm = {
  type: string;
  name: string;
  label: string;
};

const PhInput = ({ type, name, label }: TInputForm) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};
export default PhInput;
