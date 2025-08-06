import { steps } from "@/constants";
import { Check } from "lucide-react";

interface MultiStepProgressProps {
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (step: number) => void;
  allowNavigation?: boolean;
}

const MultiStepProgress = ({
  currentStep,
  completedSteps = [],
  onStepClick,
  allowNavigation = false,
}: MultiStepProgressProps) => {
  return (
    <div className="w-full pb-6">
      {/* Progress Steps */}
      <div className="relative flex items-center mb-4">
        {steps.map((item, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = completedSteps.includes(stepNumber);
          const isClickable =
            allowNavigation && (isCompleted || stepNumber < currentStep);

          return (
            <div key={item.name} className="flex items-center flex-1">
              {/* Step Circle */}
              <div
                className={`
                  relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 z-10
                  ${
                    isActive
                      ? "bg-green-500 text-white ring-4 ring-green-100"
                      : isCompleted
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-600"
                  }
                  ${isClickable ? "cursor-pointer hover:scale-105" : ""}
                `}
                onClick={() => isClickable && onStepClick?.(stepNumber)}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 relative">
                  <div
                    className={`h-full rounded transition-all duration-300 ${
                      stepNumber < currentStep || isCompleted
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex">
        {steps.map((item, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = completedSteps.includes(stepNumber);

          return (
            <div
              key={`${item.name}-label`}
              className="flex flex-col items-start text-left flex-1"
              style={{ paddingLeft: index === 0 ? "0" : "2rem" }}
            >
              <h3
                className={`text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-green-600"
                    : isCompleted
                      ? "text-green-500"
                      : "text-gray-500"
                }`}
              >
                {item.name}
              </h3>
              {isActive && (
                <div className="mt-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepProgress;
