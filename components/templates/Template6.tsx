import React from "react";
import { UserProfile } from "@/types/types";
import ProfileInfo from "../profile/profile-info";
import ProfileSocials from "../profile/profile-socials";
import CarouselService from "../profile/carousel-service";
import Appointment from "../profile/appointment";
import Testimonials from "../profile/testimonials";
import Footer from "../profile/footer";

interface ProfilePageProps {
  userData: UserProfile; 
}

const Template6: React.FC<ProfilePageProps> = ({ userData }) => {
  const { servicePhotos = [], serviceDescription } = userData;
  return (
    <div className="overflow-y-auto overflow-x-hidden max-w-[320px] mx-auto bg-white">
          <ProfileInfo {...userData} />
      <div className="shadow-xl max-w-[320px] mx-auto">
      <ProfileSocials {...userData} />
   <CarouselService servicePhotos={servicePhotos} serviceDescription={serviceDescription || "No Description"} />
      </div>
      <Appointment />
      <Testimonials />
      <Footer {...userData} />
    </div>
  );
};

export default Template6;
