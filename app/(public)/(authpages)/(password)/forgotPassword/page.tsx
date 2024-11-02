import { ForgotPasswordForm } from "../../_components/forgot-password-form";
import { OnboardingIndicator } from "../../_components/onboard-indicator";
export default function ForgotPasswordPage() {
	const currentStep = 0;
	return (
		<div className="w-full h-full relative ">
			<ForgotPasswordForm />
			<OnboardingIndicator currentStep={currentStep} />
		</div>
	);
}
