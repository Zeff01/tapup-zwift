import { Card } from "@/types/types";
import React from "react";
import CarouselService from "../profile/carousel-service";
import ProfileInfo from "../profile/profile-info";
import ProfileSocials from "../profile/profile-socials";
// import Testimonials from "../profile/testimonials";
import Footer from "../profile/footer";

interface ProfilePageProps {
  userData: Card;
}

const Template6: React.FC<ProfilePageProps> = ({ userData }) => {
  const { servicePhotos = [], serviceDescription } = userData;
  return (
    <div className="overflow-y-auto overflow-x-hidden mx-auto max-w-[480px] bg-white">
      <ProfileInfo {...userData} />
      <div className="shadow-xl  w-full mx-auto ">
        <ProfileSocials {...userData} />
        <CarouselService
          servicePhotos={servicePhotos}
          serviceDescription={serviceDescription || "No Description"}
        />
      </div>
      {/* <Testimonials /> */}
      <Footer {...userData} />
    </div>
  );
};

export default Template6;
