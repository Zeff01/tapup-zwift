import Link from "next/link";
import Newsletter from "./newsletter";
import logo from "@/public/assets/tap-up-logo-white.png";
import Image from "next/image";
import TapupLogo from "../svgs/TapupLogo";

const list = ["Terms", "Privacy", "Cookies"];
const socials = [
  {
    title: "Instagram",
    image: "/assets/Icon-instagram.png",
  },
  { title: "Facebook", image: "/assets/icon-facebook.png" },
  { title: "linkedin", image: "/assets/Icon-linkedin.png" },
  { title: "Discord", image: "/assets/icon-discord.png" },
];
const Footer = () => {
  return (
    <footer className="pb-8 pt-16" id="contact">
      <Newsletter />
      <div className="flex mt-8 flex-col sm:flex-row w-full gap-4 justify-around pt-6 items-center">
        <div className="mx-auto aspect-[3.63] h-9">
          <Link href="/">
            <TapupLogo className="w-full h-full" />
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
            <li key={index} className="relative w-6 h-6">
              <Link href="/">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
