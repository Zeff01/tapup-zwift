import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
// import { CiCirclePlus, CiMail, CiPhone, CiSaveDown2 } from "react-icons/ci";
import { BsBookmark, BsPlusLg } from "react-icons/bs";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Template5 = ({
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

  return (
    <div className="bg-white text-black flex flex-col items-center justify-between  min-h-screen">
      <div
        className=" w-full mx-auto  max-w-[480px]"
        style={{
          backgroundImage: 'url("/assets/template5bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="flex flex-col relative   ">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                fill
                className="mx-auto w-full h-48 object-cover overflow-hidden"
              />
            ) : (
              <Image
                src={"/assets/template1coverphoto.png"}
                alt="Cover Image"
                fill
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {profilePictureUrl ? (
              <div className="w-28 h-28 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-28 h-28"
                />
              </div>
            ) : (
              <div className="bg-purple-500 w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-end gap-2 mx-3 mt-2 text-pink-400 ">
          {/* Icon buttons */}
          {/* <div className="flex flex-col justify-center items-center">
            <a href={`tel:${number}`} className="text-decoration-none">
              <CiPhone size={28} className="cursor-pointer" />
            </a>
            <p className="text-xs text-gray-500 font-semibold">Call</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <a href={`mailto:${email}`}>
              <CiMail size={28} className="cursor-pointer" />
            </a>
            <p className="text-xs text-gray-500 font-semibold">Email</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiSaveDown2
              size={28}
              className="cursor-pointer"
              onClick={() => downloadVCard(userProfile)}
            />
            <p className="text-xs text-gray-500 font-semibold">Save</p>
          </div> */}
          <div className="flex flex-col justify-center items-center">
            <div
              className="rounded-full border p-2 border-pink-400 cursor-pointer"
              onClick={() => console.log()}
            >
              <BsPlusLg size={18} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="rounded-full border p-2 border-pink-400 cursor-pointer"
              onClick={() => downloadVCard(userProfile)}
            >
              <BsBookmark size={18} />
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center sm:gap-6 gap-4 my-4 text-pink-400">
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
            <a href={skypeInviteUrl} target="_blank" rel="noopener noreferrer">
              <FaSkype size={24} />
            </a>
          )}
          {websiteUrl && (
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaGlobe size={24} />
            </a>
          )}
        </div>
        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-4 space-y-1 ">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 ">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}

          <p className="font-semibold text-gray-900 text-xs">
            {position ?? "Chief Technology Officer"}
          </p>

          <p className=" text-gray-500 text-xs">
            {email ?? "H.Watkins@gmail.com"}
          </p>

          <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
        </div>

        {/* COMPANY INFORMATION */}
        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 px-4">
          {company ?? "COMPANY"}
        </h2>

        <div className="mt-6 px-4">
          <h2 className="text-md font-bold">Company Background</h2>
          <p className="text-xs mt-4">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-md font-bold mt-6">Our Services</h3>
          <p className="text-xs mt-4">
            {serviceDescription ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2 mt-6">
          {servicePhotos
            ? servicePhotos.map((photo, index) => (
                <div key={index} className="col-span-1">
                  <Image
                    src={photo}
                    alt={`Service Photo ${index + 1}`}
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-md object-cover w-full  "
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
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-8 mb-2">
        {company ?? "COMPANY"}
      </h2>
      <div className="text-center text-xs text-gray-800  mb-2">
        © 2024 Zwiftech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template5;
