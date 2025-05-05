import React from "react";
import NavigationBoarded from "@/components/boarded/navigation";
import TopbarBoarded from "@/components/boarded/topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 flex">
      <NavigationBoarded />
      <div className="w-full lg:w-[calc(100%-25rem)] ease-in-out transition-all ml-auto flex flex-col">
        <TopbarBoarded />
        {children}
      </div>
    </main>
  );
};

export default Layout;
