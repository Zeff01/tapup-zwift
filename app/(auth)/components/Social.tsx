import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function Social({ label }: { label: string }) {
  return (
    <>
      <Button
        className="w-full flex gap-x-1 border-black h-8 rounded-full text-muted-foreground"
        size={"lg"}
        variant={"outline"}
      >
        <FcGoogle className="text-lg" />
        <span className="text-xs"> {label} with Google</span>
      </Button>
      <Button
        className="w-full flex gap-x-1 border-black h-8 rounded-full text-muted-foreground"
        size={"lg"}
        variant={"outline"}
      >
        <FaFacebook className="text-lg text-blue-600" />
        <span className="text-xs"> {label} with Facebook</span>
      </Button>
    </>
  );
}