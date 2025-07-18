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
          <div className="w-full  h-48 overflow-hidden">
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
            <MdOutlinePhone
              className="cursor-pointer"
              size={24}
            />
          </Link>
          <Link
            href={`mailto:${email}`}
            className="p-1 grid place-content-center rounded-full border-2 border-black "
          >
            <MdOutlineMailOutline
              className="cursor-pointer"
              size={24}
            />
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
            <h1 className="text-2xl font-bold mt-4 ">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold mt-2 ">Hussain Watkins</h1>
          )}
          <p className="font-semibold text-gray-600 text-xl">
            {position ?? "Chief Technology Officer"}
          </p>
          <p className=" text-gray-600 text-md">
            {email ?? "H.Watkins@gmail.com"}
          </p>
          <p className=" text-gray-600 text-md"> {number ?? +639123456789}</p>
        </div>

        <hr />

        {/* COMPANY INFORMATION */}
        <h2 className="text-4xl font-extrabold mx-auto w-full mt-6 px-4">
          {company ?? "COMPANY"}
        </h2>
        <div className="mt-6 px-4">
          <h2 className="text-md font-bold">Company Background</h2>
          <p className="text-xs text-gray-600 mt-4">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-md font-bold mt-6">Our Services</h3>
          <p className="text-xs text-gray-600 mt-4">
            {serviceDescription ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-6 px-4">
          {servicePhotos
            ? servicePhotos.map((photo, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={photo}
                  alt={`Service Photo ${index + 1}`}
                  width={500}
                  height={500}
                  layout="responsive"
                  className="rounded-md object-cover w-full"
                />
              </div>
            ))
            : Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src="/assets/sampleService.png"
                  alt="Service Photo"
                  width={500}
                  height={500}
                  layout="responsive"
                  className="rounded-md object-cover w-full"
                />
              </div>
            ))}
        </div>
      </div>
      {/* SOCIAL MEDIA ICONS */}
      <div className="flex flex-col justify-center items-center mt-8 mb-4">
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
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mb-2">
        {company ?? "COMPANY"}
      </h2>
      <div className="text-center text-xs text-gray-800  mb-2">
        © 2024 Zwiftech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template4;
