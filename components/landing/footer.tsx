import Link from "next/link";
import TapupLogo from "../svgs/TapupLogo";

const listItem = {
  list: ["About", "Contact", "Privacy Policy", "Terms and Conditions"],
  url: ["/#about", "/contact", "/privacy-policy", "/terms-conditions"],
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-t-grayTemplate" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Centered logo */}
          <Link href="/" className="mb-6">
            <TapupLogo className="h-10" />
          </Link>

          {/* Centered navigation links */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 mb-6">
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

          {/* Centered contact information */}
          <div className="flex flex-col sm:flex-row gap-4 items-center text-sm text-gray-600 mt-2 dark:text-white">
            <p>codebility.dev@gmail.com</p>
            <span className="hidden sm:inline">•</span>
            <p>+63921090799</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
