import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
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

const Template3 = ({
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
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  skypeInviteUrl,
  viberUrl,
  websiteUrl,
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
    <div className="bg-black text-white  flex flex-col items-center justify-between min-h-screen">
      <div className=" w-full mx-auto max-w-[480px]">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className=" flex flex-col relative w-full  ">
          <div className="w-full  h-48 overflow-hidden ">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto w-full h-48 object-cover overflow-hidden rounded-md"
              />
            ) : (
              <Image
                src={"/assets/template2coverphoto.png"}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2  ">
            {profilePictureUrl ? (
              <div className="w-32 h-32  rounded-full mx-auto overflow-hidden ">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  fill
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className=" w-32 h-32 rounded-full mx-auto flex items-center justify-center">
                <Image
                  src={"/assets/template4samplepic.png"}
                  alt="Profile Image"
                  fill
                  className="rounded-full"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>
        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-20 space-y-1 ">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 text-greenTitle">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 text-greenTitle">Jane Doe</h1>
          )}

          <p className=" text-grayDescription text-sm">{email}</p>

          <p className=" text-grayDescription text-sm"> {number}</p>
        </div>
        {/* CTA BUTTONS */}
        <div className="flex justify-center gap-4 mt-6 font-bold">
          {/* Icon buttons */}

          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-full">
            <a href={`tel:${number}`} className="text-decoration-none">
              <MdOutlinePhone size={16} className="cursor-pointer text-black" />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-full">
            <a href={`mailto:${email}`} className="text-decoration-none">
              <MdOutlineMailOutline
                size={16}
                className="cursor-pointer text-black"
              />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-full">
            <MdOutlineBookmarkBorder
              size={16}
              className="cursor-pointer text-black"
              onClick={() => downloadVCard(userProfile)}
            />
          </div>
        </div>
        {/* SOCIAL MEDIA ICONS */}
        <div className="flex items-center justify-center gap-2 mt-6 my-4  w-40 mx-auto">
          {facebookUrl && (
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
          )}
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={24} />
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={24} />
            </a>
          )}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          )}
          {viberUrl && (
            <a href={viberUrl} target="_blank" rel="noopener noreferrer">
              <FaViber size={24} />
            </a>
          )}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={24} />
            </a>
          )}
          {skypeInviteUrl && (
            <a
              href={`skype:${skypeInviteUrl}?chat`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSkype size={24} />
            </a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaGlobe size={24} />
            </a>
          )}
        </div>

        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold text-white mb-1">
            Professional Portfolio
          </h2>
          <p className="text-sm text-gray-300">
            Below you&#39;ll find details about my professional experience and
            the companies I&#39;ve worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>
        <div className="px-4">
          <div className="relative mb-6">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent" />
            <div className="flex items-center justify-center">
              <div className="px-4 py-1">
                <span className="text-xs uppercase tracking-wider text-blue-300 font-medium">
                  Company Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY INFORMATION */}
        <div className="px-4">
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
      <div className="flex flex-col items-center gap-1 text-center w-full py-4">
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

export default Template3;
