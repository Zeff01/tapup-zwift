"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { headerItems } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import AvatarIcon from "../AvatarIcon";
import TapupLogo from "../svgs/TapupLogo";

const Header = () => {
  const { user } = useUserContext();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleMobileMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="flex sticky top-0 z-50 bg-background justify-between items-center md:px-10 shadow-xl p-4">
      <Link href="/" rel="preload">
        <TapupLogo className="w-20 lg:w-auto" />
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
        <Button className="hidden lg:block bg-green-600 hover:bg-green-700">
          Activate
        </Button>
        <AvatarIcon
          className="hidden lg:block text-black"
          img={user?.profilePictureUrl || "https://github.com/shadcn.png"}
        />

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
              <Button className="bg-green-600 hover:bg-green-700">
                Activate
              </Button>
              <AvatarIcon
                img={user?.profilePictureUrl || "https://github.com/shadcn.png"}
                className="text-black"
              />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
