import clsx from "clsx";
import Image from "next/image";

interface profileCardProps {
  user: {
    profilePictureUrl?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    } | null;
    className?:string,
}

const ProfileCard = ({ user,className }: profileCardProps) => {
    if (!user) {
        return <p>No user data available</p>;
    }

    return (
        <div className={clsx("w-full", className)}>
      <h3 className="text-muted-foreground font-semibold md:text-lg text-sm">
        Profile
      </h3>
      <div className="mx-auto w-full p-4 border border-muted flex items-center gap-4 rounded-md">
        <Image
          src={user?.profilePictureUrl!}
          className="rounded-full h-[4rem] w-[4rem]"
          alt="profileImg"
          width={60}
          height={60}
        />
        <div>
          <h2 className="text-lg font-semibold">
            {`${user?.firstName} ${user?.lastName}`}
          </h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
