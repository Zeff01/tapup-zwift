import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Please enter you password" }),
});

export const registerSchema = z
  .object({
    name: z
      .string({ message: "Please provide a name" })
      .min(2, { message: "Please provide at least two characters" }),
    lastName: z
      .string({ message: "Please provide your last name" })
      .min(3, { message: "Please provide at least three characters" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    retypePassword: z.string({ message: "Please retype your password" }),
  })
  .refine((data) => data.password === data.retypePassword, {
    path: ["retypePassword"],
    message: "Passwords do not match",
  });
