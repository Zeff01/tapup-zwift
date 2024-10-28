import Link from "next/link";
import Newsletter from "./newsletter";
import logo from "@/public/assets/tapUp-logo.png";
import Image from "next/image";

const list = ["Terms", "Privacy", "Cookies"];
const socials = [{
  title: 'Instagram',
  image: '/assets/Icon-instagram.png',
},
    {title: 'Facebook',
  image: '/assets/icon-facebook.png',
},
  {title: 'linkedin',
  image: '/assets/Icon-linkedin.png',
},
  {title: 'Discord',
  image: '/assets/icon-discord.png',
},
];
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
            <li key={index} className="relative w-6 h-6">
              <Link href="/">
                <Image src={item.image} alt={item.title} fill className="object-contain"/>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
