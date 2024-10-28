import BackGround from "../components/back-ground";
import { LogInForm } from "../components/LoginForm";

export default function LogInPage() {
  return (
    <main className="flex justify-center items-center  min-h-screen p-4">
      <div className="flex bg-[#21C15C] h-[577px] max-w-[900px] w-full  rounded-md">
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
