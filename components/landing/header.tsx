"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

import { headerItems } from "@/constants";

import TapupLogo from "../svgs/TapupLogo";
import { ThemeToggle } from "../Theme";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex sticky top-0 z-50 bg-background justify-between items-center md:px-10 shadow-xl p-4">
      <Link href="/" rel="preload">
        <TapupLogo className="w-18 lg:w-28" />
      </Link>

      <div className="flex items-center gap-4 lg:gap-8">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-xl">
          {headerItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${
                item.href === pathname
                  ? "text-green-600 border-b-2 border-greenTitle"
                  : ""
              } hover:text-green-500`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Activate Button */}
        <Link href="/login">
          <Button className="hidden lg:block  text-lg  bg-green-600 hover:bg-green-700">
            Sign in
          </Button>
        </Link>

        <ThemeToggle />

        {/* Mobile Menu Trigger */}
        <div
          className="lg:hidden cursor-pointer mr-4"
          onClick={handleMobileMenu}
        >
          <RxHamburgerMenu size={20} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed 
          top-0 
          left-0 
          w-full 
          h-full 
          bg-primaryBackground 
          z-[100] 
          transform 
          transition-transform 
          duration-300 
          ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <TapupLogo className="w-18" />
            <button onClick={handleMobileMenu} className="text-2xl font-bold">
              &times;
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-6 p-6 text-xl">
            {headerItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  ${
                    item.href === pathname
                      ? "text-green-600 border-b-2 border-greenTitle"
                      : ""
                  } 
                  hover:text-green-500 
                  py-2
                `}
                onClick={handleMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            <Link href="/login" className="mt-4" onClick={handleMobileMenu}>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Activate
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
