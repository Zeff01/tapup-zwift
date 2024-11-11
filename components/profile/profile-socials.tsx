import { RiFacebookFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import Link from "next/link";
import { UserProfile } from "@/types/types";

const style = {
  width: "24px",
  height: "24px",
  cursor: "pointer",
  color: "black",
};
const ProfileSocials = ({
  facebookUrl,
  linkedinUrl,
  instagramUrl,
}: UserProfile) => {
  return (
    <section className="flex gap-3 w-[15rem] pt-5 pl-2">
      <Link href={facebookUrl || "/"}>
        <RiFacebookFill style={style} />
      </Link>
      <Link href={linkedinUrl || "/"}>
        <FaLinkedinIn style={style} />
      </Link>
      <Link href={instagramUrl || "/"}>
        <FiInstagram style={style} />
      </Link>
    </section>
  );
};

export default ProfileSocials;
