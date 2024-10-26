import BackGround from "../components/back-ground";
import { RegisterForm } from "../components/RegisterForm";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center  min-h-screen p-4">
      <div className="flex bg-[#21C15C] max-w-[900px] w-full  rounded-md">
        <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden">
          <BackGround />
        </div>
        <div className="flex flex-1 items-center justify-center z-10">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
