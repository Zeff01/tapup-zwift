"use client";

import { Button } from "@/components/ui/button";
import { CARD_ROUTE, UPDATE_ROUTE } from "@/constants";
import { signInWithGoogle, signInWithFacebook } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Social({ label }: { label: string }) {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle();

    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setIsFacebookLoading(true);
      const response = await signInWithFacebook();
      if (response) {
        router.push(`${CARD_ROUTE}`);
      }
    } catch (error) {
      console.error("Facebook sign-in error:", error);
    } finally {
      setIsFacebookLoading(false);
    }
  };



  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-center text-muted-foreground mb-2">
        Or continue with
      </p>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full h-9 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-md"
          variant="outline"
          disabled={isGoogleLoading || isFacebookLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="mr-2 text-lg" />
          )}
          <span>{label} with Google</span>
        </Button>
      </motion.div>

      {/* Uncomment to enable Facebook login
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleFacebookSignIn}
          className="w-full h-9 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-md"
          variant="outline"
          disabled={isGoogleLoading || isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaFacebook className="mr-2 text-lg text-blue-600" />
          )}
          <span>{label} with Facebook</span>
        </Button>
      </motion.div>
      */}
    </div>
  );
}
