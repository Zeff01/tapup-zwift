import { Card } from "@/types/types";
import CarouselService from "../profile/carousel-service";
import ProfileInfo from "../profile/profile-info";
import ProfileSocials from "../profile/profile-socials";
// import Testimonials from "../profile/testimonials";
import Footer from "../profile/footer";
import { Template6Container } from "./templatesComponents";

const Template6 = (cardData: Card) => {
  // Handle undefined or null cardData
  if (!cardData) {
    return <Template6Container>Loading...</Template6Container>;
  }

  const { servicePhotos = [], serviceDescription = "No Description" } =
    cardData;

  return (
    <Template6Container>
      <div className="px-4">
        <ProfileInfo {...cardData} />
        <div className="shadow-xl w-full mx-auto">
          <ProfileSocials {...cardData} />
          <CarouselService
            servicePhotos={servicePhotos}
            serviceDescription={serviceDescription}
          />
        </div>
        {/* <Testimonials /> */}
        <Footer {...cardData} />
      </div>
    </Template6Container>
  );
};

export default Template6;
