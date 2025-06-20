import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import { CiCirclePlus, CiSaveDown2, CiMail, CiPhone } from "react-icons/ci";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaSkype,
  FaGlobe,
} from "react-icons/fa6";

const Template3 = ({
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
    <div className="bg-black text-white  flex flex-col items-center justify-between  min-h-screen  ">
      <div className=" w-full mx-auto  max-w-[480px]">
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
            <h1 className="text-xl font-bold mt-2 text-greenTitle">
              Hussain Watkins
            </h1>
          )}

          <p className="font-semibold text-white text-xl">
            {position ?? "Chief Technology Officer"}
          </p>

          <p className=" text-grayDescription text-sm">
            {email ?? "H.Watkins@gmail.com"}
          </p>

          <p className=" text-grayDescription text-sm">
            {" "}
            {number ?? +639123456789}
          </p>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="grid grid-cols-4 justify-center gap-4 my-4  w-40 mx-auto">
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

        {/* CTA BUTTONS */}
        <div className="flex justify-center space-x-4 mt-2 font-bold">
          {/* Icon buttons */}
          <div className="flex flex-col justify-center items-center">
            <a href={`tel:${number}`} className="text-decoration-none">
              <CiPhone size={32} className="cursor-pointer" />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center">
            <a href={`mailto:${email}`}>
              <CiMail size={32} className="cursor-pointer" />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiSaveDown2
              size={32}
              className="cursor-pointer"
              onClick={() => downloadVCard(userProfile)}
            />
          </div>
        </div>

        {/* COMPANY INFORMATION */}

        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 text-greenTitle px-4">
          {company ?? "COMPANY"}
        </h2>
        <div className="mt-6 px-4">
          <h2 className="text-md font-bold text-greenTitle">
            Company Background
          </h2>
          <p className="text-xs text-grayDescription mt-4">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-md font-bold mt-6 text-greenTitle">
            Our Services
          </h3>
          <p className="text-xs text-grayDescription mt-4">
            {serviceDescription ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6  p-2">
          {servicePhotos
            ? servicePhotos.map((photo, index) => (
                <div key={index} className="col-span-1">
                  <Image
                    src={photo}
                    alt={`Service Photo ${index + 1}`}
                    width={300}
                    height={300}
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
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-md object-cover w-full"
                  />
                </div>
              ))}
        </div>
      </div>
      {/* FOOTER */}
      <div className="text-center text-xs text-grayDescription mt-8 mb-2">
        © 2024 Zwiftech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template3;
