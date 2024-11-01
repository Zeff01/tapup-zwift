import React from "react";

interface OnboardingIndicatorProps {
	currentStep: number;
	totalSteps?: number;
}

export const OnboardingIndicator: React.FC<OnboardingIndicatorProps> = ({
	currentStep,
	totalSteps = 4,
}) => {
	return (
		<div className="absolute bottom-0 flex gap-x-8 mb-4 justify-center items-center">
			{[...Array(totalSteps)].map((_, index) => (
				<span
					key={index}
					className={`block w-[70px] h-[8px] rounded-[8px] text-3xl ${
						index === currentStep ? "bg-green-500" : "bg-black"
					}`}
				></span>
			))}
		</div>
	);
};
