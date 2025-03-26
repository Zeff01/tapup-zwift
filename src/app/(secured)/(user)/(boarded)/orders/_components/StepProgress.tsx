import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface Step {
  label: string;
  icon: LucideIcon;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
}

const StepProgress: FC<StepProgressProps> = ({ steps, currentStep }) => {
  return (
    <ol className="flex flex-col items-center w-full">
      <div className="flex items-center justify-around w-full relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLastStep = index === steps.length - 1;

          return (
            <div
              key={step.label}
              className="relative flex-1 flex justify-center"
            >
              {!isLastStep && (
                <div
                  className={`absolute top-1/2 left-1/2 w-full h-1 -translate-y-1/2 transform ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
              <div
                className={`flex items-center justify-center rounded-full transition-all z-10 ${
                  isCompleted
                    ? "bg-green-500 w-4 h-4"
                    : isActive
                      ? "bg-bgColor w-10 h-10"
                      : "bg-bgColor w-10 h-10 text-gray-500"
                }`}
              >
                {/* Show icon if not completed */}
                {!isCompleted ? (
                  <step.icon
                    className={`md:w-10 md:h-10 w-6 h-6 bg-background ${isActive ? "text-greenColor" : "text-muted-foreground bg-bgColor"} `}
                  />
                ) : (
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-around  items-center mt-2 text-sm md:text-lg  text-gray-600">
        {steps.map((step, index) => {
          const lastLabel = index === steps.length - 1;
          return (
            <div
              key={step.label}
              className="flex gap-2 w-[245px] items-center justify-center"
            >
              <span
                className={`${index === currentStep ? "text-green-600 font-semibold " : "text-muted-foreground "} ${!lastLabel && ""}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </ol>
  );
};

export default StepProgress;
