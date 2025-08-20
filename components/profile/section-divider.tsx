import React from "react";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "secondary";
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  title,
  subtitle,
  variant = "primary",
}) => {
  const gradientClass =
    variant === "primary"
      ? "from-blue-500 to-purple-500"
      : "from-pink-500 to-orange-400";

  return (
    <div className="py-4 px-4">
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <div
          className={`h-1 w-16 mt-1 bg-gradient-to-r ${gradientClass} rounded-full`}
        ></div>
        {subtitle && <p className="text-gray-600 mt-2 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SectionDivider;
