import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button className="w-full border-black" size={"lg"} variant={"outline"}>
        <FcGoogle className="text-2xl" />
      </Button>
      <Button className="w-full border-black" size={"lg"} variant={"outline"}>
        <FaFacebook className="text-2xl text-blue-600" />
      </Button>
    </div>
  );
};
