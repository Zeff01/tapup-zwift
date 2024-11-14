import BackGround from "../_components/auth-background";
import { RegisterForm } from "../_components/signup-form";

export default function SignUpPage() {
  return (
    <main className="flex justify-center items-center flex-1 p-4">
      <div className="flex bg-[#21C15C] max-w-[900px] w-full  rounded-md">
        <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden ">
          <BackGround />
        </div>
        <div className="flex flex-1 items-center justify-center z-10">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
