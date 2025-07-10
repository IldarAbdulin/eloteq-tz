import type { ChangeEvent } from 'react';

interface Props {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const CustomTextareaField: React.FC<Props> = ({
  id,
  label,
  name,
  value,
  onChange,
  disabled = false,
}) => (
  <div>
    <label className="block font-semibold mb-1" htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      rows={4}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded border border-gray-300 px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>
);

export default CustomTextareaField;
