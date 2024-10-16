import { RegisterForm } from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 h-full">left</div>
      <div className="flex-1 min-h-screen">
        <RegisterForm />
      </div>
    </div>
  );
}
