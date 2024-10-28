"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navbarItems = [
  { href: "/", label: "Main" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/features", label: "Features" },
];

const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const handleMobileMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="flex justify-between items-center md:px-10 p-4 shadow-xl">
      <div className="flex-grow-0 h-8 w-24 relative">
        <Link href="/" rel="preload">
          <Image src="/assets/tap-up-header-logo.png" alt="logo" className="object-contain" fill />
        </Link>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <nav className="hidden lg:flex gap-6 text-xl">
          {navbarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${
                item.href === pathname ? "text-green-600 border-b-2 border-greenTitle" : ""
              } hover:text-green-500`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button className="hidden lg:block bg-green-500 hover:bg-green-700">Activate</Button>

        <Sheet>
          <SheetTrigger asChild>
            <div className="lg:hidden cursor-pointer mr-4" onClick={handleMobileMenu}>
              <RxHamburgerMenu size={40} />
            </div>
          </SheetTrigger>
          <SheetContent side="top">
            <nav className="flex flex-col gap-3 items-center text-xl">
              {navbarItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    item.href === pathname ? "text-green-600 border-b-2 border-greenTitle" : ""
                  } hover:text-green-500`}
                  onClick={() => setOpenMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-green-500 hover:bg-green-700">Activate</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
