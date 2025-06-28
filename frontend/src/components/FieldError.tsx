interface FieldErrorProps {
  field: string;
  errors: { field: string; message: string }[];
}

const FieldError = ({ field, errors }: FieldErrorProps) => {
  const error = errors.find((err) => err.field === field);
  if (!error) return null;

  return (
    <p className="text-red-400 text-sm font-semibold mt-1 text-right">{error.message}</p>
  );
};

export default FieldError;
