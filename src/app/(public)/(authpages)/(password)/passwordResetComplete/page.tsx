"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});
import { OnboardingIndicator } from "../../_components/onboard-indicator";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
export default function SuccessResetPasswordPage() {
  const currentStep = 2;
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const router = useRouter();

  useEffect(() => {
    const expiration = localStorage.getItem("passwordResetExpiration");

    if (key === expiration && key !== null) {
      console.log("eyy");
      const timer = setTimeout(() => {
        localStorage.removeItem("passwordResetExpiration");
        router.push("/login");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem("passwordResetExpiration");
      router.push("/login");
    }
  }, [key, router]);

  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Card className="w-full h-full flex flex-col justify-center items-center border-0 shadow-none bg-transparent relative">
          <CardHeader className="space-y-4 items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <h1
                className={cn(
                  fonts.className,
                  "text-2xl md:text-3xl font-black"
                )}
              >
                All Done!
              </h1>
              <p className="text-sm text-muted-foreground">
                Your password has been successfully reset.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs text-muted-foreground mt-4"
              >
                Redirecting to login page...
              </motion.p>
            </motion.div>
          </CardHeader>
        </Card>
      </motion.div>
      <OnboardingIndicator currentStep={currentStep} />
    </div>
  );
}
