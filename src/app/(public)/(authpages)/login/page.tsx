import BackGround from "../_components/auth-background";
import { LogInForm } from "../_components/login-form";

export default function LogInPage() {
  return (
    <main className="flex justify-center items-center flex-1 p-4">
      <div className="flex bg-[#21C15C] h-auto md:h-[577px] max-w-[900px] w-full  rounded-md">
        <div className="hidden md:flex flex-1 items-center rounded-md overflow-hidden">
          <BackGround />
        </div>
        <div className="flex flex-1 items-center justify-center z-10">
          <LogInForm />
        </div>
      </div>
    </main>
  );
}
