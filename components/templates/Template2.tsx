import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaSkype,
  FaGlobe,
  FaViber,
  FaTiktok,
} from "react-icons/fa6";

const Template2 = ({
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
    <div className="bg-neutral-800 text-white p-4 flex flex-col items-center justify-between  min-h-screen">
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

          <p className="font-semibold text-white text-xs">
            {position ?? "Chief Technology Officer"}
          </p>

          <p className=" text-gray-500 text-xs">
            {email ?? "H.Watkins@gmail.com"}
          </p>

          <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
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
        <div className="flex justify-center gap-2.5 sm:gap-4 mt-5 mb-6">
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
        <hr />

        {/* COMPANY INFORMATION */}
        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6">
          {company ?? "COMPANY"}
        </h2>
        <div className="mt-6">
          <h2 className="text-md font-bold">Company Background</h2>
          <p className="text-xs mt-4 text-gray-300">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-md font-bold mt-6">Our Services</h3>
          <p className="text-xs mt-4 text-gray-300">
            {serviceDescription ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6  ">
          {servicePhotos
            ? servicePhotos.map((photo, index) => (
                <div key={index} className="col-span-1">
                  <Image
                    src={photo}
                    alt={`Service Photo ${index + 1}`}
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-md object-cover w-full shadow shadow-white overflow-hidden"
                  />
                </div>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="col-span-1">
                  <Image
                    src="/assets/sampleService.png"
                    alt="Service Photo"
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-md object-cover w-full shadow shadow-white overflow-hidden"
                  />
                </div>
              ))}
        </div>
      </div>
      {/* FOOTER */}
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-8 mb-2">
        {company ?? "COMPANY"}
      </h2>
      <div className="text-center text-xs text-gray-500  mb-2">
        © 2024 Zwiftech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template2;
