import React from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { TextInput } from "flowbite-react";

interface Props {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  color: string;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText: React.ReactNode;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordTextInput: React.FC<Props> = ({
  id,
  placeholder,
  type,
  color,
  name,
  onBlur,
  onChange,
  helperText,
  isPasswordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <div className="relative">
      <TextInput
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        color={color}
        onBlur={onBlur}
        onChange={onChange}
        helperText={helperText}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex h-4 items-center px-2"
        onClick={togglePasswordVisibility}
        style={{ top: "14px" }}
      >
        {isPasswordVisible ? <HiEyeOff /> : <HiEye />}
      </button>
    </div>
  );
};

export default PasswordTextInput;
