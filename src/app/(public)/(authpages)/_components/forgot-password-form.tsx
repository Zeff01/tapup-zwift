"use client";

import Link from "next/link";
//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//shadcn cards and fonts
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});

//zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { forgotPasswordSchema } from "@/lib/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordHandler } from "@/lib/firebase/auth";
import { ForgotPasswordData } from "@/types/types";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: forgotPasswordMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: forgotPasswordHandler,
    onSuccess: () => {
      // Show success message
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    await forgotPasswordMutation(data.email);
  };

  const isLoading = isPending || isSuccess;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mb-4"
    >
      <Card className="w-full flex flex-col justify-center border-0 shadow-none bg-transparent">
        <CardHeader className="space-y-0.5 px-0 pb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mx-auto mb-4 p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl"
          >
            <KeyRound className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={cn(
              fonts.className,
              "text-lg md:text-xl lg:text-2xl font-black text-center"
            )}
          >
            Forgot Password?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xs text-muted-foreground text-center"
          >
            No worries, we&#39;ll send you reset instructions
          </motion.p>
        </CardHeader>

        <CardContent className="space-y-2 px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="pl-9 h-8 text-sm rounded-xl border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 transition-colors"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2 mt-4"
              >
                <Button
                  type="submit"
                  className="w-full h-9 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending instructions...
                    </>
                  ) : (
                    <>
                      Send Reset Instructions
                      <motion.span
                        className="ml-2 inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  className="w-full h-9 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium rounded-xl transition-all duration-300"
                  variant="outline"
                  disabled={isLoading}
                >
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                    Back to Sign In
                  </Link>
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
