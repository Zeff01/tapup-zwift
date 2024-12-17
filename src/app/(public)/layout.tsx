import Header from "@/components/landing/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PublicRouteLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicRouteLayout;
