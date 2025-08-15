import { Card } from "@/types/types";
import Link from "next/link";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaViber,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

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
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
}: Partial<Card>) => {
  return (
    <section className="flex gap-3 w-[15rem] pt-5 pl-2">
      {facebookUrl && (
        <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FaFacebook style={style} />
        </Link>
      )}
      {twitterUrl && (
        <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <FaXTwitter style={style} />
        </Link>
      )}
      {youtubeUrl && (
        <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          <FaYoutube style={style} />
        </Link>
      )}
      {instagramUrl && (
        <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <FaInstagram style={style} />
        </Link>
      )}
      {linkedinUrl && (
        <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <FaLinkedin style={style} />
        </Link>
      )}
      {viberUrl && (
        <Link href={viberUrl} target="_blank" rel="noopener noreferrer">
          <FaViber style={style} />
        </Link>
      )}
      {whatsappNumber && (
        <Link
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp style={style} />
        </Link>
      )}
      {skypeInviteUrl && (
        <Link
          href={`skype:${skypeInviteUrl}?chat`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSkype style={style} />
        </Link>
      )}
      {websiteUrl && (
        <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
          <FaGlobe style={style} />
        </Link>
      )}
    </section>
  );
};

export default ProfileSocials;
