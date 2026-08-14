import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled,
}: ButtonProps) => {

  const styles = {
    primary:
      "bg-[#4F8CFF] hover:bg-[#3b78ff] text-white",
      
    secondary:
      "bg-[#111113] border border-white/10 text-white hover:bg-white/10",

    ghost:
      "bg-transparent text-gray-300 hover:bg-white/5",
  };


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      px-5 py-2.5
      rounded-xl
      transition-all
      duration-300
      backdrop-blur-xl
      disabled:opacity-50
      ${styles[variant]}
      ${className}
      `}
    >
      {children}
    </button>
  );
};


export default Button;