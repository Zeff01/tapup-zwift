import React from "react";
import ProfileInfo from "./profile-info";
import ProfileSocials from "./profile-socials";
import CarouselService from "./carousel-service";
import Appointment from "./appointment";
import Testimonials from "./testimonials";
import Footer from "./footer";

const ProfilePage = () => {
  return (
    <div className="overflow-y-auto">
      <ProfileInfo />
      <ProfileSocials />
      <CarouselService />
      <Appointment />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default ProfilePage;
