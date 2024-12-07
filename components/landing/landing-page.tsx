import AboutTapup from "./about-tapup";
import TapUpCarousel from "./carouselCard";
import FeaturedBusiness from "./feature-business";
import CompanyList from "./feature-company";
import Footer from "./footer";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import ShoppingCard from "./shopping-card";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <CompanyList />
      <AboutTapup />
      <ShoppingCard />
      <HowItWorks />
      <TapUpCarousel />
      <FeaturedBusiness />
      <Footer />
    </>
  );
};

export default LandingPage;
