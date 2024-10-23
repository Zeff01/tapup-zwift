
import AboutTapup from "./about-tapup";
import CompanyList from "./company-list";
import Hero from "./hero";
import HowItWorks from "./how-it-works";
import ShoppingCard from "./shopping-card";

const LandingPage = () => {
  return (
      <section className="overflow-hidden">
      <Hero />
      <CompanyList />
      <AboutTapup />
      <ShoppingCard />
      <HowItWorks/>
      </section>
  )
}

export default LandingPage