import { type LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import FieldError from "./FieldError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  errors: { field: string; message: string }[];
  icon: LucideIcon;
}

const Input = ({ field, errors, icon: Icon, ...props }: Props) => {
  return (
    <div className="relative">
      <div className="relative top-[32px] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
      />
      <FieldError field={field} errors={errors!} />
    </div>
  );
};
export default Input;
