import { BackGround } from "@/components/auth/BackGround";
import { LeftContent } from "@/components/auth/LeftContent";
import { LogInForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <BackGround />
      <LeftContent />
      <div className="flex-1 z-10 min-h-screen">
        <LogInForm />
      </div>
    </div>
  );
}
