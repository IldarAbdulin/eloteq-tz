import type { ChangeEvent } from 'react';

interface ICustomTextInputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextInputField = ({
  id,
  label,
  onChange,
  value,
  type,
}: ICustomTextInputFieldProps) => {
  return (
    <div>
      <label className="block font-semibold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

export default CustomTextInputField;
