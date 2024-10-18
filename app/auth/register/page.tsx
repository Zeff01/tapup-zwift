import { BackGround } from "@/components/auth/BackGround";
import { LeftContent } from "@/components/auth/LeftContent";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-screen bg-[#21c15c]">
      <BackGround />
      <LeftContent />
      <div className="flex-1 min-h-screen z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
