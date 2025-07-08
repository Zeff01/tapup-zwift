import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaTiktok,
  FaViber,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const DraftTemplate1 = ({
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  companyBackground,
  serviceDescription,
  servicePhotos,
  firstName,
  lastName,
  email,
  number,
  facebookUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  tiktokUrl,
  viberUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
}: Card) => {
  const userProfile = {
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
  };

  return (
    <div className="bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 text-gray-800 p-4 flex flex-col items-center justify-between min-h-screen relative">
      {/* Paper Texture Background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.15) 1px, transparent 0),
            linear-gradient(45deg, rgba(245, 245, 220, 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(245, 245, 220, 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(245, 245, 220, 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(245, 245, 220, 0.1) 75%)
          `,
          backgroundSize:
            "10px 10px, 20px 20px, 20px 20px, 20px 20px, 20px 20px",
          backgroundPosition: "0 0, 0 0, 10px 0, 0 10px, 10px 10px",
        }}
      ></div>

      {/* Paper grain effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.03) 2px,
              rgba(139, 69, 19, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(139, 69, 19, 0.03) 2px,
              rgba(139, 69, 19, 0.03) 4px
            )
          `,
        }}
      ></div>

      {/* Subtle artistic stains/watermarks */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-16 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-amber-200 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full mx-auto max-w-[480px] relative z-10">
        {/* COVER PHOTO AND PROFILE PIC */}
        <div className="relative mb-6">
          {/* Cover Photo with Artistic Border */}
          <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200">
            <Image
              src={coverPhotoUrl || "/default-cover.jpg"}
              alt="Cover"
              fill
              className="object-cover"
            />
            {/* Artistic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Profile Picture with Paint Brush Effect */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Artistic outer ring with jagged edges */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 rounded-full p-1"
                style={{
                  clipPath:
                    "polygon(98% 24%, 94% 35%, 100% 47%, 95% 60%, 99% 72%, 92% 83%, 98% 95%, 85% 92%, 73% 99%, 60% 95%, 47% 100%, 35% 94%, 24% 98%, 12% 91%, 2% 95%, 5% 83%, 0% 72%, 5% 60%, 0% 47%, 6% 35%, 2% 24%, 9% 12%, 2% 5%, 15% 8%, 27% 1%, 40% 5%, 53% 0%, 66% 6%, 76% 2%, 88% 8%)",
                }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-stone-100 to-amber-50"></div>
              </div>

              {/* Main profile picture container with decorative border */}
              <div
                className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-amber-100 to-orange-100"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(251, 191, 36, 0.3), 0 0 0 4px rgba(251, 191, 36, 0.1), 0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Image
                  src={profilePictureUrl || "/default-user.png"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                {/* Inner artistic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-100/20"></div>
              </div>

              {/* Enhanced Artistic Paint Splash Effects */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-70 blur-sm"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full opacity-60 blur-sm"></div>
              <div className="absolute -bottom-0 -left-0 w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
              <div className="absolute top-2 -right-4 w-3 h-3 bg-amber-400 rounded-full opacity-50"></div>
              <div className="absolute -top-4 left-2 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>

        {/* USER INFO with Artistic Typography */}
        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
            {firstName} {lastName}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mb-3 rounded-full"></div>
          <p className="text-lg text-amber-700 font-medium mb-1">{position}</p>
          <p className="text-base text-gray-600 italic">{company}</p>
        </div>

        {/* CONTACT INFO with Artist Theme */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-amber-100 relative overflow-hidden">
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)`,
            }}
          ></div>
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
              Contact Canvas
            </h3>
            <div className="space-y-3">
              {email && (
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm">✉</span>
                  </div>
                  <span className="text-sm">{email}</span>
                </div>
              )}
              {number && (
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm">📞</span>
                  </div>
                  <span className="text-sm">{number}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COMPANY OVERVIEW */}
        {companyBackground && (
          <div className="bg-gradient-to-r from-stone-50 to-amber-50 rounded-2xl p-6 mb-6 shadow-lg border border-amber-200 relative overflow-hidden">
            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(139, 69, 19, 0.1) 3px, rgba(139, 69, 19, 0.1) 6px)`,
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                Company Overview
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {companyBackground}
              </p>
            </div>
          </div>
        )}

        {/* OUR SERVICES */}
        {serviceDescription && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-amber-100 relative overflow-hidden">
            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)`,
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                Our Services
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {serviceDescription}
              </p>
            </div>
          </div>
        )}

        {/* SERVICE PHOTOS with Gallery Layout */}
        {servicePhotos && servicePhotos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              Art Gallery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {servicePhotos.slice(0, 4).map((photo, index) => (
                <div
                  key={index}
                  className="relative h-32 rounded-xl overflow-hidden shadow-lg border-2 border-amber-200"
                >
                  <Image
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SOCIAL MEDIA LINKS - Horizontal Layout */}
        <div className="flex justify-center gap-6 mb-8 py-4">
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaFacebook size={18} />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaInstagram size={18} />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaXTwitter size={18} />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaLinkedin size={18} />
            </a>
          )}
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaYoutube size={18} />
            </a>
          )}
          {tiktokUrl && (
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaTiktok size={18} />
            </a>
          )}
          {viberUrl && (
            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaViber size={18} />
            </a>
          )}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaWhatsapp size={18} />
            </a>
          )}
          {skypeInviteUrl && (
            <a
              href={skypeInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaSkype size={18} />
            </a>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
            >
              <FaGlobe size={18} />
            </a>
          )}
        </div>

        {/* Company Footer - Similar to Template12 */}
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-600 mt-8 mb-4">
          <h2 className="font-semibold text-xl tracking-wider text-gray-800">
            {company ?? "COMPANY"}
          </h2>
          <div className="flex justify-center items-center">
            <span className="text-lg">©</span>
            <span className="text-xs ml-1">
              2024 Zwiftech. All Right Reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftTemplate1;
