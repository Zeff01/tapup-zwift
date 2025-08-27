import { Card } from "@/types/types";
import React from "react";
import ProfileInfo from "../profile/profile-info";
import ProfileSocials from "../profile/profile-socials";
import CompanyShowcase from "../profile/company-showcase";
import Footer from "../profile/footer";
import { Template6Container, sampleCompanies } from "./templatesComponents";

interface ProfilePageProps {
  userData: Card;
}

const Template6: React.FC<ProfilePageProps> = ({ userData }) => {
  const { companies = [], profilePictureUrl, firstName, lastName } = userData;
  const displayCompanies =
    companies && companies.length > 0 ? companies : sampleCompanies;
  return (
    <Template6Container>
      <div className="mx-auto max-w-[480px]">
        <ProfileInfo {...userData} />

        <ProfileSocials {...userData} />

        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold mb-1">Professional Portfolio</h2>
          <p className="text-sm">
            Below you&#39;ll find details about my professional experience and
            the companies I&#39;ve worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>
      </div>

      <div className="w-full mx-auto">
        {/* Company Experience Section */}
        {displayCompanies && displayCompanies.length > 0 && (
          <div className="mt-4 mb-4">
            <div className="px-4">
              <div className="relative mb-6">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-purple-400 to-transparent" />
                <div className="flex items-center justify-center">
                  <div className="bg-transparent px-4 py-1">
                    <span className="text-xs uppercase tracking-wider text-blue-600 font-medium">
                      Company Experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <CompanyShowcase
              companies={displayCompanies}
              profilePictureUrl={profilePictureUrl}
              firstName={firstName}
              lastName={lastName}
            />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <Footer {...userData} />
    </Template6Container>
  );
};

export default Template6;
