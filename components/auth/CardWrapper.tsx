import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";
import { Divider } from "./Divider";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonMessage: string;
  backButtonLabel: string;
  method: string;
  backButtonHref: string;
}

export default function CardWrapper({
  children,
  method,
  backButtonLabel,
  headerLabel,
  backButtonHref,
  backButtonMessage,
}: CardWrapperProps) {
  return (
    <Card className="w-full h-full flex justify-center flex-col px-[80px] rounded-none ">
      <CardHeader className="px-6 py-0 leading-tight ">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="pb-0 ">{children}</CardContent>
      <CardFooter className="flex justify-center gap-x-2 pb-0">
        <p className="text-muted-foreground ">{backButtonMessage}</p>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      <Divider />
      <CardFooter>
        <Social method={method} />
      </CardFooter>
    </Card>
  );
}
