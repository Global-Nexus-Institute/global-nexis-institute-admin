import { Input } from "antd";
import "antd/es/app/style/index";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  postAdon?: React.ReactNode;
  textarea?: boolean;
  select?: boolean;
  checkbox?: boolean;
  numeric?: boolean;
  radio?: boolean;
  value?: string | number;
  password?: boolean;
  options?: { label: string; value: string }[];
  required?: true;
  showTime?: true;
  selectMode?: "multiple" | "tags";
  showSearch?: true;
  rows?: number;
  onSelect?: (value: any) => void;
};
export const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  icon,
  type,
  textarea,
  password,
  value,
  numeric,
  select,
  required,
  checkbox,
  radio,
  options,
  onChange,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });
  const showError = meta.touched && meta.error;

  const  InputComponent: any = Input;
  return (
    <div className={`field ${showError ? "error" : ""}`}>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="text-red-500">*</span>}{" "}
        </label>
      )}
      <FormItem>
        {!select && !numeric && !password && !radio && !checkbox && (
          <InputComponent
            {...field}
            {...props}
            id={name}
            name={name}
            placeholder={placeholder}
            icon={icon}
            prefix={icon}
            type={InputComponent === "input" ? (type ? type : "") : ""}
            onChange={onChange}
          />
        )}
        
      </FormItem>
    </div>
  );
};
