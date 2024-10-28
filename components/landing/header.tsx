"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"; // Adjust this import according to your actual path
import { usePathname } from "next/navigation";
import tapUpLogo from '@/public/assets/tap-up-header-logo.png';
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
      <div className="w-full md:px-4">
        <div className="relative h-[5rem] w-[8rem]">

        <Link href="/" rel="preload" className="w-full h-[4rem]">
          
          <Image src={tapUpLogo} alt='logo' fill className="object-contain" />
            </Link>
        </div>
      </div>
      <div
        className={`lg:flex lg:flex-row lg:justify-evenly gap-3 hidden w-full items-center`}
      >
        <nav className="flex lg:flex-row gap-3 lg:gap-8 items-center text-xl">
          {navbarItems.map((item, index) => (
            <Link
              className={`${
                item.href === pathname
                  ? "text-green-600 border-b-2 border-greenTitle"
                  : ""
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

      <Sheet>
        <SheetTrigger asChild>
          <div
            className="lg:hidden cursor-pointer mr-4"
            onClick={handleMobileMenu}
          >
            {<RxHamburgerMenu size={40} />}
          </div>
        </SheetTrigger>
        <SheetContent className="" side="top">
          <nav className="flex flex-col gap-3 items-center text-xl">
            {navbarItems.map((item, index) => (
              <Link
                className={`${
                  item.href === pathname
                    ? "text-green-600 border-b-2 border-greenTitle"
                    : ""
                } hover:text-green-500`}
                key={index}
                href={item.href}
                onClick={()=> setOpenMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="bg-green-500 hover:bg-green-700"
            >
              Activate
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
    );

};

export default Header;
