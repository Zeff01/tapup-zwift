import { LogInForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">left</div>
      <div className="flex-1 h-full">
        <LogInForm />
      </div>
    </div>
  );
}
