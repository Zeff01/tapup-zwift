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
  backButtonHref: string;
}

export default function CardWrapper({
  children,
  backButtonLabel,
  headerLabel,
  backButtonHref,
  backButtonMessage,
}: CardWrapperProps) {
  return (
    <Card className="w-full h-full flex flex-col justify-center px-[128px] rounded-none ">
      <CardHeader className="px-6 py-0 leading-tight pb-[35px]">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="pb-0 ">{children}</CardContent>
      <CardFooter className="flex justify-center gap-x-2 pb-0">
        <p className="text-muted-foreground ">{backButtonMessage}</p>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
      <Divider />
      <CardFooter>
        <Social />
      </CardFooter>
    </Card>
  );
}
