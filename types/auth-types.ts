import { z } from "zod";
import {
	signupSchema,
	loginSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
} from "@/schema";

export type LoginData = z.infer<typeof loginSchema>;

export type SignupData = z.infer<typeof signupSchema>;

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
