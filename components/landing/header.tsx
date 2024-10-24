"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navbarItems = [
  { label: "Main", href: "/" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Features", href: "/features" },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const handleMobileMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="flex justify-between items-center h-[105px] shadow-xl">
      <div className="container">
        <Link href="/" rel="preload">
          <h2 className="text-[40px]">
            Tap <span className="text-greenTitle">Up</span>
          </h2>
        </Link>
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:justify-evenly gap-3 absolute lg:static lg:bg-transparent bg-slate-100 w-full items-center transition-all duration-300 ease-in ${
          openMenu ? "top-[6rem]" : "top-[-400px]"
        }`}
      >
        <nav
          className={`flex flex-col lg:flex-row gap-3 lg:gap-8 items-center text-xl`}
        >
          {navbarItems.map((item, index) => (
            <Link
              className={`${
                item.href === pathname &&
                "text-green-600 border-b-2 border-greenTitle"
              } hover:text-green-500`}
              key={index}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button className="lg:mr-[85px] bg-green-500 hover:bg-green-700">
          Activate
        </Button>
      </div>

      <div className="lg:hidden cursor-pointer mr-4" onClick={handleMobileMenu}>
        {openMenu ? <IoMdClose size={40} /> : <RxHamburgerMenu size={40} />}
      </div>
    </header>
  );
};

export default Header;
