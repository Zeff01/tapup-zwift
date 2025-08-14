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

const Template1 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
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
    websiteUrl,
    customUrl,
  };

  return (
    <div className="bg-white text-black p-2 flex flex-col items-center overflow-hidden justify-between min-h-screen">
      <div className="w-full mx-auto max-w-[480px]">
        {/* COVER PHOTO + PROFILE */}
        <div className="mt-2 flex flex-col relative rounded-4xl mx-4">
          <div className="w-full h-48">
            <Image
              src={coverPhotoUrl || "/assets/template1coverphoto.png"}
              alt="Cover"
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-[2rem] overflow-hidden"
            />
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full w-24 h-24"
              />
            ) : (
              <div className="bg-purple-500 w-28 h-28 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="text-center mt-14 space-y-1">
          <h1 className="text-xl font-bold">
            {firstName ? `${firstName} ${lastName}` : "Hussain Watkins"}
          </h1>

          <p className="text-gray-500 text-xs">
            {email ?? "H.Watkins@gmail.com"}
          </p>
          <p className="text-gray-500 text-xs">{number ?? "+639123456789"}</p>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-2.5 mt-5">
          <Link
            href={`tel:${number}`}
            className="p-1 bg-white rounded-full border-2 border-black"
          >
            <MdOutlinePhone size={20} />
          </Link>
          <Link
            href={`mailto:${email}`}
            className="p-1 bg-white rounded-full border-2 border-black"
          >
            <MdOutlineMailOutline size={20} />
          </Link>
          <div className="p-1 bg-white cursor-pointer rounded-full border-2 border-black">
            <MdOutlineBookmarkBorder
              size={20}
              onClick={() => downloadVCard(userProfile)}
            />
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center  gap-1 md:gap-2  xl:gap-4 mt-5 mb-6 ">
          {facebookUrl && (
            <Link href={facebookUrl} target="_blank">
              <FaFacebook size={24} />
            </Link>
          )}
          {twitterUrl && (
            <Link href={twitterUrl} target="_blank">
              <FaXTwitter size={24} />
            </Link>
          )}
          {tiktokUrl && (
            <Link href={tiktokUrl} target="_blank">
              <FaTiktok size={24} />
            </Link>
          )}
          {youtubeUrl && (
            <Link href={youtubeUrl} target="_blank">
              <FaYoutube size={24} />
            </Link>
          )}
          {instagramUrl && (
            <Link href={instagramUrl} target="_blank">
              <FaInstagram size={24} />
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank">
              <FaLinkedin size={24} />
            </Link>
          )}
          {viberUrl && (
            <Link href={viberUrl} target="_blank">
              <FaViber size={24} />
            </Link>
          )}
          {whatsappNumber && (
            <Link href={`https://wa.me/${whatsappNumber}`} target="_blank">
              <FaWhatsapp size={24} />
            </Link>
          )}
          {skypeInviteUrl && (
            <Link href={`skype:${skypeInviteUrl}?chat`} target="_blank">
              <FaSkype size={24} />
            </Link>
          )}
          {websiteUrl && (
            <Link href={websiteUrl} target="_blank">
              <FaGlobe size={24} />
            </Link>
          )}
        </div>

        <hr />

        {companies?.length > 0 &&
          companies.map((c, idx) => (
            <div
              key={idx}
              className="mt-6 p-3 rounded-xl border border-gray-200 shadow-sm bg-white"
            >
              <div className="flex flex-col items-center text-center space-y-1">
                <h2 className="text-2xl font-bold text-gray-800">
                  {c.company}
                </h2>
                <h3 className="text-sm font-medium text-gray-600">
                  {c.position}
                </h3>
              </div>

              {c.companyBackground && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Company Background
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                    {c.companyBackground}
                  </p>
                </div>
              )}

              {(c.serviceDescription || (Array.isArray(c.servicePhotos) && c.servicePhotos.length > 0)) && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Our Services
                  </h3>
                  {c.serviceDescription && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                      {c.serviceDescription}
                    </p>
                  )}
                  {Array.isArray(c.servicePhotos) && c.servicePhotos.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {c.servicePhotos.map((photo, i) => (
                        <Image
                          key={i}
                          src={photo}
                          alt={`Service Photo ${i + 1}`}
                          width={300}
                          height={300}
                          layout="responsive"
                          className="rounded-md object-cover w-full "
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* footer */}
      <div className="flex flex-col mt-8 items-center gap-1 text-center">
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

        <span className="tracking-wide text-gray-600 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Template1;
