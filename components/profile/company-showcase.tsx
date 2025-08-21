"use client";
import { Card } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";

interface CompanyShowcaseProps {
  companies?: Card["companies"];
  profilePictureUrl?: string;
  firstName?: string;
  lastName?: string;
}

const CompanyShowcase: React.FC<CompanyShowcaseProps> = ({
  companies,
  profilePictureUrl,
  firstName,
  lastName,
}) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-2">
      <div className="space-y-5">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div
              className={`flex items-center p-4 cursor-pointer ${true ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100" : ""}`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full overflow-hidden ${true ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-gray-400 to-gray-600"} flex items-center justify-center shadow-inner`}
                >
                  <span className="text-white font-bold">
                    {company.company?.charAt(0) || "C"}
                  </span>
                </div>
              </div>

              <div className="ml-4 flex-1">
                <h3
                  className={`font-semibold ${true ? "text-blue-800" : "text-gray-900"}`}
                >
                  {company.company}
                </h3>
                <p
                  className={`text-sm ${true ? "text-blue-600" : "text-gray-500"}`}
                >
                  {company.position}
                </p>
              </div>
            </div>

            {true && (
              <motion.div
                className="p-5 bg-white"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                    {profilePictureUrl ? (
                      <Image
                        src={profilePictureUrl}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {firstName?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {firstName} {lastName}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">
                        {company.position}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-gray-300 mx-2"></div>
                      <span className="text-xs text-blue-500">
                        {company.company}
                      </span>
                    </div>
                  </div>
                </div>

                {company.companyBackground && (
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      About
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {company.companyBackground}
                    </p>
                  </div>
                )}

                {company.serviceDescription && (
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Services
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {company.serviceDescription}
                    </p>
                  </div>
                )}

                {Array.isArray(company.servicePhotos) &&
                  company.servicePhotos.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Portfolio
                      </h4>
                      {company.servicePhotos.length === 1 ? (
                        <div className="rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={company.servicePhotos[0]}
                            alt={`${company.company} service`}
                            width={600}
                            height={300}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {company.servicePhotos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="rounded-lg overflow-hidden shadow-sm relative group"
                            >
                              <Image
                                src={photo}
                                alt={`${company.company} service ${photoIndex + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CompanyShowcase;
