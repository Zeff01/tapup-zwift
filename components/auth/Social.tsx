import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-x-2 gap-y-[20px]">
      <Button
        className="w-full border-black rounded-full h-[46px] gap-x-2"
        size={"lg"}
        variant={"outline"}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-muted-foreground">Sign in with Google</span>
      </Button>
      <Button
        className="w-full border-black rounded-full h-[46px] gap-x-2"
        size={"lg"}
        variant={"outline"}
      >
        <FaFacebook className="text-2xl text-blue-500" />
        <span className="text-muted-foreground">Sign in with Google</span>
      </Button>
    </div>
  );
};
