import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
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
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";

const Template2 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  customUrl,
  companies,
}: Card) => {
  const userProfile = {
    id,
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    customUrl,
  };

  return (
    <div className="bg-neutral-800 text-white p-2  flex flex-col items-center justify-between  min-h-screen">
      <div className=" w-full mx-auto max-w-[480px] ">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="mt-2  flex flex-col relative rounded-4xl mx-4 ">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto w-full h-48 object-cover rounded-[2rem] overflow-hidden"
              />
            ) : (
              <Image
                src={"/assets/template1coverphoto.png"}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {profilePictureUrl ? (
              <div className="grid place-content-center w-28 h-28 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
                />
              </div>
            ) : (
              <div className="bg-purple-500 w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-14 space-y-1 ">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 ">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}

          <p className=" text-gray-300 text-xs">{email}</p>

          <p className=" text-gray-300 text-xs"> {number}</p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-center gap-2.5 mt-5">
          <Link
            href={`tel:${number}`}
            className="p-1 grid place-content-center bg-white rounded-full border-2 border-black "
          >
            <MdOutlinePhone className="cursor-pointer text-black" size={20} />
          </Link>
          <Link
            href={`mailto:${email}`}
            className="p-1 grid place-content-center bg-white rounded-full border-2 border-black "
          >
            <MdOutlineMailOutline
              className="cursor-pointer text-black"
              size={20}
            />
          </Link>
          <div className="p-1 grid place-content-center bg-white rounded-full border-2 border-black ">
            <MdOutlineBookmarkBorder
              className="cursor-pointer text-black font-bold"
              onClick={() => downloadVCard(userProfile)}
              size={20}
            />
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center gap-2  mt-5 mb-6">
          {facebookUrl && (
            <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} />
            </Link>
          )}
          {twitterUrl && (
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={20} />
            </Link>
          )}
          {tiktokUrl && (
            <Link href={tiktokUrl} target="_blank" rel="noopener noreferrer">
              <FaTiktok size={20} />
            </Link>
          )}
          {youtubeUrl && (
            <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={20} />
            </Link>
          )}
          {instagramUrl && (
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} />
            </Link>
          )}
          {viberUrl && (
            <Link href={viberUrl} target="_blank" rel="noopener noreferrer">
              <FaViber size={20} />
            </Link>
          )}
          {whatsappNumber && (
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} />
            </Link>
          )}
          {skypeInviteUrl && (
            <Link
              href={`skype:${skypeInviteUrl}?chat`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSkype size={20} />
            </Link>
          )}
          {websiteUrl && (
            <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaGlobe size={20} />
            </Link>
          )}
        </div>
        <hr />

        {/* COMPANY INTRODUCTION */}
        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold text-white mb-1">
            Professional Portfolio
          </h2>
          <p className="text-sm text-gray-300">
            Below you'll find details about my professional experience and the
            companies I've worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>

        <div className="relative mb-6">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent"></div>
          <div className="flex items-center justify-center">
            <div className="bg-neutral-800 px-4 py-1">
              <span className="text-xs uppercase tracking-wider text-blue-300 font-medium">
                Company Experience
              </span>
            </div>
          </div>
        </div>

        {/* COMPANY INFORMATION */}
        <div className="px-2">
          {companies?.map((c, i) => (
            <div
              key={i}
              className="mb-4 relative bg-neutral-900 rounded-xl shadow-xl overflow-hidden border border-neutral-700"
            >
              {/* Company Post Header - Facebook Style */}
              <div className="flex items-center px-4 py-2 border-b border-neutral-700">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0 border border-neutral-600">
                  {profilePictureUrl ? (
                    <Image
                      src={profilePictureUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600">
                      <span className="text-white font-bold text-xs">
                        {firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-2 flex-1">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-white">
                      {firstName} {lastName}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400">
                        {c.position} at{" "}
                      </span>
                      <span className="text-xs font-medium text-blue-400 ml-1">
                        {c.company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About & Services Content - Above Images */}
              <div className="px-4 pt-3">
                {/* Background & Services */}
                <div className="space-y-3 mb-3">
                  {c.companyBackground?.trim() && (
                    <div>
                      <h2 className="text-sm font-bold text-blue-300 mb-1">
                        About
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {c.companyBackground}
                      </p>
                    </div>
                  )}

                  {c.serviceDescription?.trim() && (
                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-blue-300 mb-1">
                        Services
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {c.serviceDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Service Photos - Below About & Services */}
                {Array.isArray(c.servicePhotos) &&
                  c.servicePhotos.length > 0 && (
                    <div className="mt-2 mb-3">
                      {c.servicePhotos.length === 1 ? (
                        <div className="relative overflow-hidden rounded-lg border border-neutral-700">
                          <Image
                            src={c.servicePhotos[0]}
                            alt={`${c.company} Featured Image`}
                            width={600}
                            height={400}
                            layout="responsive"
                            className="object-cover w-full"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-1">
                          {c.servicePhotos.map((photo, index) => (
                            <div
                              key={index}
                              className="relative overflow-hidden rounded-md border border-neutral-700"
                            >
                              <Image
                                src={photo}
                                alt={`${c.company} Portfolio Image ${index + 1}`}
                                width={300}
                                height={300}
                                layout="responsive"
                                className="object-cover w-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* FOOTER */}

      <div className="flex flex-col items-center gap-1 text-center text-xs">
        <a
          href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/light-ZwiftechLogo.png"
            alt="Zwiftech Logo"
            width={40}
            height={15}
            priority
            className="opacity-90"
          />
        </a>

        <span className="tracking-wide text-gray-400 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Template2;
