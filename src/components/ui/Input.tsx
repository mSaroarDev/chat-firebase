type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = ({
  placeholder,
  type = "text",
  className,
  onChange,
  value,
}: InputProps) => {
    return (
        <>
          <input 
            className={`w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary ${className ?? ""}`}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            value={value}
          />
        </>
    );
};

export default Input;