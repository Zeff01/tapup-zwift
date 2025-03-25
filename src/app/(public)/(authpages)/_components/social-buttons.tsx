"use client";

import { Button } from "@/components/ui/button";
import { CARD_ROUTE, UPDATE_ROUTE } from "@/constants";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function Social({ label }: { label: string }) {
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    const response = await signInWithGoogle();
    if (response) {
      // router.push(`${UPDATE_ROUTE}/${response}`);
      router.push(`${CARD_ROUTE}`);
    }
  };

  const handleFacebookSignIn = async () => {
    const response = await signInWithFacebook();
    if (response) {
      router.push(`${CARD_ROUTE}`)
      // router.push(`${UPDATE_ROUTE}/${response}`);
    }
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
      {/* <Button
        onClick={handleFacebookSignIn}
        className="w-full flex gap-x-1 border-gray-500 dark:border h-8 rounded-full text-muted-foreground"
        size={"lg"}
        variant={"outline"}
      >
        <FaFacebook className="text-lg text-blue-600" />
        <span className="text-xs"> {label} with Facebook</span>
      </Button> */}
    </>
  );
}
