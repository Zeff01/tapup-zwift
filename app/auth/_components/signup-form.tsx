"use client";

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
import { SignupData } from "@/types/auth-types";
import { signupSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import {
  signInWithFacebook,
  signInWithGoogle,
  signUpHandler,
} from "@/src/lib/firebase/config/auth";
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { firebaseDb } from "@/src/lib/firebase/config/firebase";
import { createSession } from "@/src/lib/firebase/config/session";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupData) => {
    try {
      const userId = await signUpHandler(data.email, data.password);
      await setDoc(doc(firebaseDb, "user-account", userId), {
        email: data.email,
        timestamp: serverTimestamp(),
      });
      toast.success("User registration successful!");
      form.reset();
      router.push("/auth/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("Email already exists!");
            break;
          default:
            toast.error("Something went wrong!");
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user.uid) {
        await createSession(user.uid);
      }
      await setDoc(doc(firebaseDb, "user-account", user.uid), {
        email: user.email,
        timestamp: serverTimestamp(),
      });
      toast.success("Login successful!");
      router.push("/create");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.code);
      }
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const user = await signInWithFacebook();
      if (user.uid) {
        await createSession(user.uid);
      }
      await setDoc(doc(firebaseDb, "user-account", user.uid), {
        email: user.email,
        timestamp: serverTimestamp(),
      });
      toast.success("Login successful!");
      router.push("/create");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.code);
      }
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold ">Sign up</CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link href={"/auth/login"} className="text-green-500 hover:underline duration-300">
            Login
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
                  <FormLabel className="text-black font-semibold text-sm">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                  <FormLabel className="text-black font-semibold text-sm">Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black font-semibold text-sm">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
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
              Sign up
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
          Sign up with Google
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={handleFacebookSignIn}
        >
          <FaFacebookF />
          Sign up with Facebook
        </Button>
      </CardFooter>
    </Card>
  );
}
