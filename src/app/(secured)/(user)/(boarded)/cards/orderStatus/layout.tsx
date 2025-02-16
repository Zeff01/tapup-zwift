"use client";
import { useParams } from "next/navigation";
import NavBar from "../_components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useParams();

  // Define the title based on the status
  const getStatus = () => {
    switch (status) {
      case "success":
        return "Order Pending";
      case "failed":
        return "Order Unsuccessful";
      default:
        return "Order Status";
    }
  };

  return (
    <main className="">
      {/* Navigation Bar */}
      <NavBar title={getStatus()} href="/cards" />
      {children}
    </main>
  );
};

export default Layout;
