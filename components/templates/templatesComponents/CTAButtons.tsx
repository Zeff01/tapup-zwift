import { Button } from "@/components/ui/button";
import { cn, downloadVCard } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { LuDownload, LuMail, LuPhone } from "react-icons/lu";
import {
  MdOutlineFileDownload,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";

interface CTAButtonsProps {
  number?: string;
  email?: string;
  userProfile: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    number?: string;
    company?: string;
    position?: string;
    websiteUrl?: string;
    customUrl?: string;
  };
  variant?: "default" | "rounded" | "pills" | "floating" | "inline";
  size?: "sm" | "md" | "lg";
  icons?: "outline" | "lucide";
  className?: string;
  buttonClassName?: string;
  showLabels?: boolean;
  layout?: "horizontal" | "vertical" | "grid";
}

const iconSets = {
  outline: {
    phone: MdOutlinePhone,
    mail: MdOutlineMailOutline,
    download: MdOutlineFileDownload,
  },
  lucide: {
    phone: LuPhone,
    mail: LuMail,
    download: LuDownload,
  },
};

const sizeClasses = {
  sm: {
    button: "p-1 w-8 h-8",
    icon: 16,
    text: "text-xs",
  },
  md: {
    button: "p-1.5 w-10 h-10",
    icon: 18,
    text: "text-sm",
  },
  lg: {
    button: "p-3 w-12 h-12",
    icon: 20,
    text: "text-base",
  },
};

export const CTAButtons: React.FC<CTAButtonsProps> = ({
  number,
  email,
  userProfile,
  variant = "default",
  size = "md",
  icons = "outline",
  className,
  buttonClassName,
  showLabels = false,
  layout = "horizontal",
}) => {
  const PhoneIcon = iconSets[icons].phone;
  const MailIcon = iconSets[icons].mail;
  const DownloadIcon = iconSets[icons].download;
  const {
    button: buttonSize,
    icon: iconSize,
    text: textSize,
  } = sizeClasses[size];

  const layoutClasses = {
    horizontal: "flex gap-2",
    vertical: "flex flex-col gap-2",
    grid: "grid grid-cols-3 gap-2",
  };

  const getButtonClasses = () => {
    const baseClasses = cn(
      "flex items-center justify-center transition-all duration-200",
      buttonSize,
      buttonClassName
    );

    switch (variant) {
      case "rounded":
        return cn(
          "rounded-full border-2 border-black bg-white hover:bg-gray-100",
          baseClasses
        );
      case "pills":
        return cn(
          "rounded-full bg-black text-white hover:bg-gray-800",
          baseClasses
        );
      case "floating":
        return cn(
          "rounded-full bg-white text-black border border-neutral-300 shadow hover:bg-black hover:text-white",
          baseClasses
        );
      case "inline":
        return cn("rounded-lg bg-transparent hover:bg-gray-100", baseClasses);
      default:
        return cn(
          "rounded-md border border-gray-300 hover:bg-gray-50",
          baseClasses
        );
    }
  };

  const buttonClass = getButtonClasses();

  return (
    <div className={cn(layoutClasses[layout], className)}>
      {number && (
        <Link href={`tel:${number}`} className={buttonClass} title="Call">
          <PhoneIcon size={iconSize} />
          {showLabels && <span className={cn("ml-2", textSize)}>Call</span>}
        </Link>
      )}
      {email && (
        <Link href={`mailto:${email}`} className={buttonClass} title="Email">
          <MailIcon size={iconSize} />
          {showLabels && <span className={cn("ml-2", textSize)}>Email</span>}
        </Link>
      )}
      {(userProfile.company || userProfile.position || userProfile.email) && (
        <button
          onClick={() => downloadVCard(userProfile)}
          className={buttonClass}
          title="Save Contact"
          type="button"
        >
          <DownloadIcon size={iconSize} />
          {showLabels && <span className={cn("ml-2", textSize)}>Save</span>}
        </button>
      )}
    </div>
  );
};

// Pre-configured variants for common use cases
export const Template1CTA: React.FC<Omit<CTAButtonsProps, "variant">> = (
  props
) => <CTAButtons {...props} variant="rounded" />;

export const Template9CTA: React.FC<
  Omit<CTAButtonsProps, "variant" | "size">
> = (props) => <CTAButtons {...props} variant="floating" size="sm" />;

export const Template13CTA: React.FC<Omit<CTAButtonsProps, "variant">> = (
  props
) => (
  <CTAButtons
    {...props}
    variant="pills"
    buttonClassName="px-3 py-3 rounded-full font-medium"
  />
);

export const Template15CTA: React.FC<Omit<CTAButtonsProps, "variant">> = (
  props
) => (
  <CTAButtons
    {...props}
    variant="rounded"
    buttonClassName="bg-[#122b3a] text-[#38bdf8] border border-[#38bdf8] hover:bg-[#19384a] hover:border-[#7dd3fc] w-11 h-11"
  />
);

// Email-only button component for templates that have a standalone email button
export const EmailButton: React.FC<{
  email: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ email, className, children }) => (
  <Button className={className}>
    <a href={`mailto:${email}`}>{children || "Email me!"}</a>
  </Button>
);
