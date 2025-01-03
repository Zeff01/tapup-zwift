import React from "react";

interface OnboardingIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
}) => {
  return (
    <div className="flex gap-x-8 mb-4 justify-center w-full absolute bottom-0">
      {[...Array(totalSteps)].map((_, index) => (
        <span
          key={index}
          className={`block w-[70px] h-[8px] rounded-[8px] text-3xl ${
            index === currentStep ? "bg-[#21C15C]" : "bg-[#E6E7EB]"
          }`}
        ></span>
      ))}
    </div>
  );
};
