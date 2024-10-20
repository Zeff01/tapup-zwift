import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Please enter your" }).email(),
  password: z.string().min(1, { message: "Please enter your password" }),
});

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Please provide a name" })
      .min(3, { message: "More than 2 characters required" }),
    lastName: z
      .string({ message: "Please provide your last name" })
      .min(2, { message: "Minimum 2 characters required" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
