"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function Social({ label }: { label: string }) {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.push("/onboarding");
  };

  const handleFacebookSignIn = async () => {
    await signInWithFacebook();
    router.push("/onboarding");
  };
  return (
    <>
      <Button
        onClick={handleGoogleSignIn}
        className="w-full flex gap-x-1 border-gray-500 dark:border h-8 rounded-full text-muted-foreground"
        size={"lg"}
        variant={"outline"}
      >
        <FcGoogle className="text-lg" />
        <span className="text-xs"> {label} with Google</span>
      </Button>
      <Button
        onClick={handleFacebookSignIn}
        className="w-full flex gap-x-1 border-gray-500 dark:border h-8 rounded-full text-muted-foreground"
        size={"lg"}
        variant={"outline"}
      >
        <FaFacebook className="text-lg text-blue-600" />
        <span className="text-xs"> {label} with Facebook</span>
      </Button>
    </>
  );
}
