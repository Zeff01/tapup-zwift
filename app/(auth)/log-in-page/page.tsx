"use client";

import { Divider } from "@/components/auth/divider";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
import BackGround from "@/components/auth/back-ground";
import { LogInForm } from "@/components/auth/loginForm";

const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});

export default function LogInPage() {
  return (
    <main className="flex justify-center items-center  min-h-screen">
      <div className="flex bg-[#21C15C] h-[617px] max-w-[900px] w-full ">
        <div className="hidden sm:flex flex-1 items-center">
          <BackGround />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full rounded-none shadow-md p-5  md:p-10 h-full flex flex-col justify-center">
            <CardHeader
              className={cn(fonts.className, "text-5xl font-black pb-4 pt-0 ")}
            >
              Sign In
            </CardHeader>
            <CardContent className="pb-0 ">
              <LogInForm />
            </CardContent>
            <CardFooter className="flex flex-col pb-0">
              <Divider />
            </CardFooter>
            <CardFooter className="flex flex-col gap-y-3">
              <Button
                className="w-full flex gap-x-1 border-black h-8 rounded-full text-muted-foreground"
                size={"lg"}
                variant={"outline"}
              >
                <FcGoogle className="text-lg" />
                <span className="text-xs"> Sign In with Google</span>
              </Button>
              <Button
                className="w-full flex gap-x-1 border-black h-8 rounded-full text-muted-foreground"
                size={"lg"}
                variant={"outline"}
              >
                <FaFacebook className="text-lg text-blue-600" />
                <span className="text-xs"> Sign In with Facebook</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
