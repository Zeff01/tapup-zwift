import Link from "next/link";
import Newsletter from "./newsletter";
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

const listItem = {
  list: ["About", "Contact", "Privacy Policy", "Terms and Conditions"],
  url: ["/#about", "/contact", "/privacy-policy", "/terms-conditions"],
};

const Footer = () => {
  return (
    <footer className="pb-8 pt-16" id="contact">
      {/* hide newsletter */}
      {/* <Newsletter /> */}

      <div className="flex mt-8 flex-col sm:flex-row w-full gap-4 justify-around pt-6 items-center">
        <div className="mx-auto text-center">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-2">
              <TapupLogo className="h-9 " />
            </Link>
            <h2 className="text-left"> codebility.dev@gmail.com</h2>
            <h2 className="text-left">+63921090799</h2>
          </div>
        </div>

        <div className="gap-8 mx-auto flex">
          <div>
            <h2 className="font-semibold text-lg">Information</h2>
            <div className="flex flex-col gap-1">
              <Link href="/testimonials" className="hover:text-hoverColor">
                Testimonials
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg">Company</h2>
            <div className="flex flex-col gap-1">
              {listItem.list.map((item, index) => (
                <Link
                  href={listItem.url[index]}
                  key={index}
                  className="hover:text-hoverColor"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* hide socials */}
        {/* <ul className="flex gap-4 mx-auto">
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
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
