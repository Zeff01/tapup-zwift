"use client";

import { useState } from "react";
import Link from "next/link";
// import { Link } from "react-scroll";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { usePathname } from "next/navigation";

import { headerItems } from "@/constants";

import TapupLogo from "../svgs/TapupLogo";
import { ThemeToggle } from "../Theme";

const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleMobileMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="flex sticky top-0 z-50 bg-background justify-between items-center md:px-10 shadow-xl p-4">
      <Link href="/" rel="preload">
        <TapupLogo className="w-18 lg:w-28" />
      </Link>

      <div className="flex items-center gap-4 lg:gap-8">
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
        <Link href="/login">
          <Button className="hidden lg:block bg-green-600 hover:bg-green-700">
            Activate
          </Button>
        </Link>
        <ThemeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <div
              className="lg:hidden cursor-pointer mr-4"
              onClick={handleMobileMenu}
            >
              <RxHamburgerMenu size={20} />
            </div>
          </SheetTrigger>
          <SheetContent side="top" className="bg-primaryBackground">
            <nav className="flex flex-col gap-3 items-center text-xl">
              {headerItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    item.href === pathname
                      ? "text-green-600 border-b-2 border-greenTitle"
                      : ""
                  } hover:text-green-500`}
                  onClick={() => setOpenMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700">
                  Activate
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
