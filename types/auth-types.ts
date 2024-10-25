import { z } from "zod";
import { signupSchema, loginSchema } from "@/schema";

export type LoginData = z.infer<typeof loginSchema>;

export type SignupData = z.infer<typeof signupSchema>;
