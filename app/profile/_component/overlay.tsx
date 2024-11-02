'use client';
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const menuItems = [
  {  title: "Dashboard", href: '/' },
  {  title: "Profile", href: '/profile' },
  {  title: "Settings", href: '/settings' },
];

interface Props {
  handleMobileMenu: () => void;
}

const OverlayMenu: React.FC<Props> = ({ handleMobileMenu }) => {
  const pathname = usePathname();

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <div className="lg:hidden cursor-pointer mr-4 z-10" onClick={handleMobileMenu}>
            <RxHamburgerMenu size={20} />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-3 items-center text-xl">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`${item.href === pathname ? "text-green-600 border-b-2 border-greenTitle" : ""} hover:text-green-500`}
                onClick={handleMobileMenu}
              >
                {item.title}
              </Link>
            ))}
            <Button className="bg-green-500 hover:bg-green-700">
              Activate
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OverlayMenu;
