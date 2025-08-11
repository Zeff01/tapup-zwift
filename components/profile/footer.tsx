import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

const Footer = ({
  firstName,
  lastName,
  number,
  customUrl,
  websiteUrl,
}: Partial<Card>) => {
  return (
    <footer className="flex flex-col justify-evenly h-[4rem] max-w-[320px] mx-auto  text-black">
      <div className="flex flex-col justify-center mt-3 items-center gap-1 ">
        <div className="flex items-center gap-2">
          {" "}
          <MdOutlineEmail />
          <h2 className=" text-xs md:text-base">
            {firstName ? firstName + " " + lastName : "Anonymous"}
          </h2>
          <FiPhoneCall />
          <h2 className="text-xs md:text-base">{number || "+63123456789"}</h2>
        </div>
        <div className="flex flex-col mt-8 mb-1 items-center gap-1 text-center text-xs">
          <a
            href={customUrl ?? websiteUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/zwift-logo.png"
              alt="Zwiftech Logo"
              width={50}
              height={20}
              priority
              className="opacity-90"
            />
          </a>

          <span className="tracking-wide text-gray-600 text-[10px] ">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
