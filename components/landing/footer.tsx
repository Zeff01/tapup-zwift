import Link from "next/link";
import Newsletter from "./newsletter";
import logo from "@/public/assets/tapUp-logo.png";
import Image from "next/image";
import instagramIcon from "@/public/assets/Icon-instagram.png";
import facebookIcon from "@/public/assets/icon-facebook.png";
import linkedinIcon from "@/public/assets/Icon-linkedin.png";
import discordIcon from "@/public/assets/icon-discord.png";

const list = ["Terms", "Privacy", "Cookies"];
const socials = [instagramIcon, facebookIcon, linkedinIcon, discordIcon];
const Footer = () => {
  return (
    <footer className="py-[4rem]">
      <Newsletter />
      <div className="flex flex-col md:flex-row w-full gap-4 justify-around pt-6">
        <div className="mx-auto">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex gap-5 mx-auto">
          {list.map((item, index) => (
            <Link href="/" key={index} className="font-semibold">
              {item}
            </Link>
          ))}
        </div>
        <ul className="flex gap-4 mx-auto">
          {socials.map((item, index) => (
            <li key={index} className="">
              <Link href="/">
                <Image src={item} alt="social icon" loading="lazy" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
