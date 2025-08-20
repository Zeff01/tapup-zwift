import { Card } from "@/types/types";
import React from "react";
import ProfileInfo from "../profile/profile-info";
import ProfileSocials from "../profile/profile-socials";
import CompanyShowcase from "../profile/company-showcase";
import SectionDivider from "../profile/section-divider";
import Footer from "../profile/footer";
import { FiPhoneCall, FiMail, FiUser } from "react-icons/fi";
import Link from "next/link";

const ContactButton = ({
  icon: Icon,
  text,
  href,
}: {
  icon: React.ElementType;
  text: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-blue-100 group"
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
        <Icon className="text-blue-600" size={14} />
      </div>
      <span className="text-sm text-gray-700 group-hover:text-gray-900">
        {text}
      </span>
    </Link>
  );
};

interface ProfilePageProps {
  userData: Card;
}

const Template6: React.FC<ProfilePageProps> = ({ userData }) => {
  const { companies = [], profilePictureUrl, firstName, lastName } = userData;

  return (
    <div className="relative bg-white text-black flex flex-col items-center justify-between  min-h-screen">
      <div className="mx-auto max-w-[480px]">
        {/* Profile Header Section */}
        <ProfileInfo {...userData} />
        {/* Social Media Links */}
        <ProfileSocials {...userData} />

        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold mb-1">Professional Portfolio</h2>
          <p className="text-sm">
            Below you'll find details about my professional experience and the
            companies I've worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>

        <div className="w-full mx-auto">
          {/* Company Experience Section */}
          {companies && companies.length > 0 && (
            <div className="mt-8 mb-4">
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
                companies={companies}
                profilePictureUrl={profilePictureUrl}
                firstName={firstName}
                lastName={lastName}
              />
            </div>
          )}
        </div>

        {/* Footer Section */}
        <Footer {...userData} />
      </div>
    </div>
  );
};

export default Template6;
