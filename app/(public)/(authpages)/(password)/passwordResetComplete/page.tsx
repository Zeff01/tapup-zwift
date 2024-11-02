"use client";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import bigCheck from "@/public/assets/big-check.png";
import smallCheck from "@/public/assets/small-check.png";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Roboto_Condensed({
	subsets: ["latin"],
	weight: ["600"],
});
import { OnboardingIndicator } from "../../_components/onboard-indicator";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
		<div className="w-full h-full relative ">
			<Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center items-center rounded-md relative">
				<Image
					src={bigCheck}
					alt="Big Check"
					width={310}
					height={450}
					className="absolute"
				/>
				<CardHeader
					className={cn(
						fonts.className,
						"  pb-3 pt-0 space-y-10 items-center w-full"
					)}
				>
					<Image src={smallCheck} alt="finger print" width={70} height={70} />
					<div className="text-center">
						<h1 className="text-4xl font-black">All Done!</h1>
						<p className="text-xs text-muted-foreground">
							Your password has been reset.
						</p>
					</div>
				</CardHeader>
			</Card>
			<OnboardingIndicator currentStep={currentStep} />
		</div>
	);
}
