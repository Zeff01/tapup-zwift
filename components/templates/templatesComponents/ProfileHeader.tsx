import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ProfileHeaderProps {
  profilePictureUrl?: string;
  coverPhotoUrl?: string;
  firstName?: string;
  lastName?: string;
  variant?: "overlay" | "stacked" | "side-by-side" | "minimal";
  profileSize?: "sm" | "md" | "lg" | "xl";
  coverHeight?: "sm" | "md" | "lg" | "full";
  className?: string;
  profileClassName?: string;
  coverClassName?: string;
  defaultProfileImage?: string;
  defaultCoverImage?: string;
  profilePosition?: "left" | "center" | "right";
  rounded?: boolean;
}

const profileSizeMap = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-28 h-28",
  xl: "w-32 h-32",
};

const coverHeightMap = {
  sm: "h-32",
  md: "h-48",
  lg: "h-64",
  full: "h-96",
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profilePictureUrl,
  coverPhotoUrl,
  firstName,
  lastName,
  variant = "overlay",
  profileSize = "lg",
  coverHeight = "md",
  className,
  profileClassName,
  coverClassName,
  defaultProfileImage,
  defaultCoverImage = "/assets/template1coverphoto.png",
  profilePosition = "center",
  rounded = true,
}) => {
  const initials = `${firstName?.[0] || "H"}${lastName?.[0] || "W"}`;
  const profileSizeClass = profileSizeMap[profileSize];
  const coverHeightClass = coverHeightMap[coverHeight];

  const profilePositionClasses = {
    left: "left-5",
    center: "left-1/2 transform -translate-x-1/2",
    right: "right-8",
  };

  const renderProfileImage = () => {
    const profileClasses = cn(
      profileSizeClass,
      rounded ? "rounded-full" : "rounded-lg",
      "overflow-hidden",
      profileClassName
    );

    if (profilePictureUrl) {
      return (
        <div className={profileClasses}>
          <Image
            src={profilePictureUrl}
            alt="Profile"
            width={128}
            height={128}
            className={cn("object-cover", profileSizeClass)}
          />
        </div>
      );
    }

    if (defaultProfileImage) {
      return (
        <div className={profileClasses}>
          <Image
            src={defaultProfileImage}
            alt="Profile"
            width={128}
            height={128}
            className={cn("object-cover", profileSizeClass)}
          />
        </div>
      );
    }

    // Default initials avatar
    return (
      <div className={profileClasses}>
        <Image
          src={"/assets/template4samplepic.png"}
          alt="Profile"
          width={128}
          height={128}
          className={cn("object-cover")}
        />
      </div>
    );
  };

  const renderCoverImage = () => {
    return (
      <div className={cn("w-full relative", coverHeightClass, coverClassName)}>
        <Image
          src={coverPhotoUrl || defaultCoverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>
    );
  };

  switch (variant) {
    case "overlay":
      return (
        <div className={cn("relative", className)}>
          {renderCoverImage()}
          <div
            className={cn(
              "absolute -bottom-12",
              profilePositionClasses[profilePosition]
            )}
          >
            {renderProfileImage()}
          </div>
        </div>
      );

    case "stacked":
      return (
        <div className={cn("flex flex-col items-center", className)}>
          {renderCoverImage()}
          <div className="-mt-12">{renderProfileImage()}</div>
        </div>
      );

    case "side-by-side":
      return (
        <div className={cn("flex items-center gap-4", className)}>
          {renderProfileImage()}
          <div className="flex-1">{renderCoverImage()}</div>
        </div>
      );

    case "minimal":
      return (
        <div className={cn("flex justify-center", className)}>
          {renderProfileImage()}
        </div>
      );

    default:
      return null;
  }
};

// Pre-configured variants for templates
export const Template1ProfileHeader: React.FC<
  Omit<ProfileHeaderProps, "variant">
> = (props) => (
  <ProfileHeader
    {...props}
    variant="overlay"
    profileSize="lg"
    coverHeight="md"
    profilePosition="center"
  />
);

export const Template9ProfileHeader: React.FC<
  Omit<ProfileHeaderProps, "variant">
> = (props) => (
  <ProfileHeader
    {...props}
    variant="overlay"
    profileSize="md"
    coverHeight="full"
    profilePosition="center"
    defaultProfileImage="/assets/template10samplepic.png"
    defaultCoverImage="/assets/template9coverphoto.png"
  />
);

export const Template7ProfileHeader: React.FC<
  Omit<ProfileHeaderProps, "variant">
> = (props) => (
  <ProfileHeader
    {...props}
    variant="overlay"
    profileSize="xl"
    coverHeight="md"
    profilePosition="left"
    rounded={false}
    defaultProfileImage="/assets/template-7-profile-picture.jpeg"
    defaultCoverImage="/assets/template-7-cover-photo.jpeg"
    profileClassName="rounded-xl border-8 border-offWhiteTemplate"
  />
);
