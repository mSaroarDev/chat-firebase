import { CgSpinner } from "react-icons/cg";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  color?: "primary" | "secondary" | "light" | "danger";
  onClick?: () => void;
};

const Button = ({
  children,
  className = "",
  startContent,
  endContent,
  isLoading = false,
  isDisabled = false,
  color = "primary",
  onClick,
}: ButtonProps) => {
    return (
        <>
          <button
            className={`
              cursor-pointer
              w-auto 
              ${color === "primary" && "bg-primary hover:bg-primary/80 text-white"} 
              ${color === "light" && "bg-slate-100 text-black hover:bg-slate-200"} 
              ${color === "danger" && "bg-red-500/10 hover:bg-danger-5 text-red-500"}
              py-2 px-4 rounded-lg hover:bg-primary-dark 
              transition-colors font-medium flex items-center justify-center gap-2 
              ${className}
            `}
            disabled={isDisabled || isLoading}
            onClick={onClick}
          >
            {(startContent && !isLoading) && startContent}
            {!isLoading && children}
            {isLoading && (
              <CgSpinner size={20} className="animate-spin" />
            )}
            {(endContent && !isLoading) && endContent}
          </button>
        </>
    );
};

export default Button;