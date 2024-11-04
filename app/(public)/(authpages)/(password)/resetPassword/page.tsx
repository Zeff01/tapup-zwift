import { ResetPasswordForm } from "../../_components/reset-password-form";
import { OnboardingIndicator } from "../../_components/onboard-indicator";
export default function ResetPasswordPage() {
  const currentStep = 1;
  return (
    <div className="w-full h-full relative ">
      <ResetPasswordForm />
      <OnboardingIndicator currentStep={currentStep} />
    </div>
  );
}
