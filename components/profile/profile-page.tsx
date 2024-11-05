import React from "react";
import ProfileInfo from "./profile-info";
import ProfileSocials from "./profile-socials";
import CarouselService from "./carousel-service";
import Appointment from "./appointment";
import Testimonials from "./testimonials";
import Footer from "./footer";
import { UserProfile } from "@/types/types";

interface ProfilePageProps {
  userData: UserProfile; 
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData }) => {
  const { servicePhotos = [], serviceDescription } = userData;
  return (
    <div className="overflow-y-auto overflow-x-hidden">
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

export default ProfilePage;
