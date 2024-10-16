import { LogInForm } from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 h-full">left</div>
      <div className="flex-1 min-h-screen">
        <LogInForm />
      </div>
    </div>
  );
}
