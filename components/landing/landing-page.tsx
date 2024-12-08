import AboutTapup from "./About";
import TapUpCarousel from "./carouselCard";
import Footer from "./footer";
import Hero from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Products from "./Product";
import UserWebsite from "./UserWebsite";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <AboutTapup />
      <HowItWorks />
      <Products />
      <UserWebsite/>
      <TapUpCarousel />
      <Footer />
    </>
  );
};

export default LandingPage;
