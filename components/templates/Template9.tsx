import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { SiSkypeforbusiness } from "react-icons/si";
import { SlSocialFacebook } from "react-icons/sl";

const Template9 = ({
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
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
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

  console.log(websiteUrl);

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col ">
      <div className=" h-96 relative   ">
        <div className="absolute flex m-1  top-0 right-0 ">
          <div className="flex gap-2">
            <a
              href={`tel:${number}`}
              className="p-1 rounded-full bg-white text-black border border-neutral-300 shadow hover:bg-black hover:text-white transition-colors duration-200"
            >
              <MdOutlinePhone size={18} />
            </a>

            <a
              href={`mailto:${email}`}
              className="p-1 rounded-full bg-white text-black border border-neutral-300 shadow hover:bg-black hover:text-white transition-colors duration-200"
            >
              <MdOutlineMailOutline size={18} />
            </a>

            <button
              onClick={() => downloadVCard(userProfile)}
              className="p-1 rounded-full bg-white text-black border border-neutral-300 shadow hover:bg-black hover:text-white transition-colors duration-200"
            >
              <MdOutlineBookmarkBorder size={18} />
            </button>
          </div>
        </div>

        <div className="">
          {coverPhotoUrl ? (
            <Image
              src={coverPhotoUrl}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto w-full object-cover overflow-hidden"
            />
          ) : (
            <Image
              src={"/assets/template9coverphoto.png"}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto"
            />
          )}
        </div>
        <div className="absolute  z-20 top-[118px] left-1/2 transform -translate-x-1/2 ">
          {profilePictureUrl ? (
            <div className=" rounded-full mx-auto overflow-hidden">
              <Image
                src={profilePictureUrl}
                alt="Profile Image"
                width={80}
                height={80}
                className="rounded-full w-24 h-24"
              />
            </div>
          ) : (
            <div className=" w-28 h-28 rounded-full mx-auto flex items-center justify-center">
              <Image
                src={"/assets/template10samplepic.png"}
                alt="Profile Image"
                width={80}
                height={80}
                className="rounded-full w-24 h-24"
              />
            </div>
          )}
        </div>
        <div className="text-center pt-16  absolute bottom-0 w-full space-y-1 bg-white rounded-t-3xl">
          {firstName ? (
            <h1 className="font-semibold text-2xl text-neutral-900 tracking-wider  capitalize">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold  ">Hussain Watkins</h1>
          )}

          <p className="text-lg  font-normal text-neutral-700">
            {position ?? "Chief Technology Officer"}
          </p>

          <div className="flex items-center font-light text-sm text-neutral-600 justify-center gap-x-2">
            <p>{email ?? "H.Watkins@gmail.com"}</p>
            <span> |</span>
            <p>{number ?? +639123456789}</p>
          </div>
          <div className=" flex items-center gap-x-4 py-4 text-2xl text-neutral-700 h-16 justify-center">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <SlSocialFacebook size={24} />
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <FaXTwitter size={24} />
              </a>
            )}
            {youtubeUrl && (
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                <FiYoutube size={24} />
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
                <SiSkypeforbusiness size={24} />
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <GoGlobe size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-y-6 pt-6 bg-white px-5 flex-grow border-t border-t-neutral-300 text-neutral-900">
        <h2 className="font-semibold text-3xl mx-auto w-full  tracking-wider  text-center">
          {company ?? "COMPANY"}
        </h2>
        <div>
          <h1 className="font-semibold tracking-wider">Company Overview</h1>
          <p className="font-light text-sm text-neutral-500 pt-2">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
        <div>
          <h1 className="font-semibold tracking-wider">Our Services</h1>
          <p className="font-light text-sm text-neutral-500 pt-2">
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
                    className="rounded-2xl object-contain w-full  "
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
                    className="rounded-2xl object-contain w-full"
                  />
                </div>
              ))}
        </div>

        {/* footer */}
        <h2 className="font-semibold text-xl mx-auto w-full  tracking-wider  text-center">
          {company ?? "COMPANY"}
        </h2>
        <div className="flex flex-col mt-3 mb-1 items-center gap-1 text-center text-xs">
          <a
            href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/zwift-logo.png"
              alt="Zwiftech Logo"
              width={50}
              height={20}
              priority
              className="opacity-90"
            />
          </a>

          <span className="tracking-wide text-gray-800 text-[10px] ">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Template9;
