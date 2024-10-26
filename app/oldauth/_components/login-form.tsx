"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { LoginData } from "@/types/auth-types";
import { loginSchema } from "@/schema";
import Link from "next/link";
import {
  loginHandler,
  signInWithFacebook,
  signInWithGoogle,
} from "@/src/lib/firebase/config/auth";
import { useRouter } from "next/navigation";

export default function OldLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    await loginHandler(data.email, data.password);
    router.push("/create");
  };
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    router.push("/create");
  };

  const handleFacebookSignIn = async () => {
    await signInWithFacebook();
    router.push("/create");
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold ">Log in</CardTitle>
        <CardDescription>
          Don&apos;t have an account?{" "}
          <Link
            href={"/auth/signup"}
            className="text-green-500 hover:underline duration-300"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-black font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-black font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle />
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleFacebookSignIn}
        >
          <FaFacebookF />
          Login with Facebook
        </Button>
      </CardFooter>
    </Card>
  );
}
