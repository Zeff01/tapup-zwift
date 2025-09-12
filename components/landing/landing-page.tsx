"use client";
import AboutTapup from "./About";
import Footer from "./footer";
import Hero from "./HeroSection";
import HowItWorks from "./HowItWorks";
import TemplateSelection from "./TemplateSelection";
import UserWebsite from "./UserWebsite";

import { useEffect } from "react";

const sections = [
  { id: "hero", hash: "", Component: Hero },
  { id: "features", hash: "features", Component: AboutTapup },
  { id: "quickguide", hash: "quickguide", Component: HowItWorks },
  { id: "templates", hash: "templates", Component: TemplateSelection },
  { id: "contact", hash: "contact", Component: UserWebsite },
  { id: "footer", hash: "contact", Component: Footer },
];

const LandingPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = sections.find((s) => s.id === entry.target.id);
            if (!target) return;

            const newHash = target.hash ? `#${target.hash}` : "";

            if (window.location.hash !== newHash) {
              const newUrl = newHash ? newHash : window.location.pathname;
              history.replaceState(null, "", newUrl);
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {sections.map(({ id, Component }) => (
        <section key={id} id={id} className="scroll-mt-20">
          <Component />
        </section>
      ))}
    </>
  );
};

export default LandingPage;
