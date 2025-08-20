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

const Template4 = ({
  id,
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
    <div className="bg-white text-black flex flex-col items-center justify-between  min-h-screen">
      <div className=" w-full mx-auto  max-w-[480px]">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className=" flex flex-col relative w-full  ">
          <div className="w-full h-48 overflow-hidden">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                fill
                className="mx-auto w-full h-48 object-cover   overflow-hidden"
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
          <div className="absolute -bottom-14 left-4 ">
            {profilePictureUrl ? (
              <div className=" rounded-full border-2 border-white mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={500}
                  height={500}
                  className="rounded-full w-32 h-32"
                />
              </div>
            ) : (
              <div className=" rounded-full mx-auto flex items-center justify-center">
                <Image
                  src={"/assets/template4samplepic.png"}
                  alt="Profile Image"
                  width={500}
                  height={500}
                  className="rounded-full w-32 h-32"
                />
              </div>
            )}
          </div>
        </div>
        {/* CTA BUTTONS */}
        <div className="flex justify-end gap-2.5 pr-4 pt-4">
          <Link
            href={`tel:${number}`}
            className="p-1 grid place-content-center rounded-full border-2 border-black "
          >
            <MdOutlinePhone className="cursor-pointer" size={24} />
          </Link>
          <Link
            href={`mailto:${email}`}
            className="p-1 grid place-content-center rounded-full border-2 border-black "
          >
            <MdOutlineMailOutline className="cursor-pointer" size={24} />
          </Link>
          <div className="p-1 grid place-content-center rounded-full border-2 border-black ">
            <MdOutlineBookmarkBorder
              className="cursor-pointer font-bold"
              onClick={() => downloadVCard(userProfile)}
              size={24}
            />
          </div>
        </div>
        {/* PERSONAL INFORMATION */}
        <div className="space-y-1 px-4 mb-4">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 ">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Jane Doe</h1>
          )}
          <p className=" text-gray-600 text-sm">{email}</p>
          <p className=" text-gray-600 text-sm"> {number}</p>
        </div>
        <hr />
        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold mb-1">Professional Portfolio</h2>
          <p className="text-sm">
            Below you&#39;ll find details about my professional experience and
            the companies I&#39;ve worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>
        <div className="px-4">
          <div className="relative mb-6">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-indigo-500 to-transparent" />
            <div className="flex items-center justify-center">
              <div className="bg-white px-4 py-1">
                <span className="text-xs uppercase tracking-wider text-blue-700 font-medium">
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
              className="mb-4 relative bg-neutral-100 rounded-xl shadow-xl overflow-hidden border border-neutral-200"
            >
              {/* Company Post Header - Facebook Style */}
              <div className="flex items-center px-4 py-2 border-b border-neutral-300">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 border border-blue-200">
                  {profilePictureUrl ? (
                    <Image
                      src={profilePictureUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500">
                      <span className="text-white font-bold text-xs">
                        {firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-2 flex-1">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-gray-800">
                      {firstName} {lastName}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-600">
                        {c.position} at{" "}
                      </span>
                      <span className="text-xs font-medium text-blue-600 ml-1">
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
                      <h2 className="text-sm font-bold text-blue-600 mb-1">
                        About
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {c.companyBackground}
                      </p>
                    </div>
                  )}

                  {c.serviceDescription?.trim() && (
                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-blue-600 mb-1">
                        Services
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-700">
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
                        <div className="relative overflow-hidden rounded-lg border border-neutral-300 shadow-md">
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
                              className="relative overflow-hidden rounded-md border border-neutral-300 shadow-md"
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
      {/* SOCIAL MEDIA ICONS */}
      <div className="flex flex-col justify-center items-center mt-3 mb-4">
        <h1 className="font-bold mb-2">Socials</h1>
        <div className="flex justify-center gap-4 mb-2">
          {facebookUrl && (
            <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </Link>
          )}
          {twitterUrl && (
            <Link href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={24} />
            </Link>
          )}
          {tiktokUrl && (
            <Link href={tiktokUrl} target="_blank" rel="noopener noreferrer">
              <FaTiktok size={24} />
            </Link>
          )}
          {youtubeUrl && (
            <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <FaYoutube size={24} />
            </Link>
          )}
          {instagramUrl && (
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </Link>
          )}
          {viberUrl && (
            <Link href={viberUrl} target="_blank" rel="noopener noreferrer">
              <FaViber size={24} />
            </Link>
          )}
          {whatsappNumber && (
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={24} />
            </Link>
          )}
          {skypeInviteUrl && (
            <Link
              href={`skype:${skypeInviteUrl}?chat`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSkype size={24} />
            </Link>
          )}
          {websiteUrl && (
            <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaGlobe size={24} />
            </Link>
          )}
        </div>
      </div>
      {/* FOOTER */}
      <div className="flex flex-col mt-3 mb-1 items-center gap-1 text-center text-xs">
        <a
          href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/dark-ZwiftechLogo.png"
            alt="Zwiftech Logo"
            width={40}
            height={15}
            priority
            className="opacity-90"
          />
        </a>

        <span className="tracking-wide text-gray-500 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Template4;
