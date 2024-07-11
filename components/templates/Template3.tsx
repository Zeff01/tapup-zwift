import { UserProfile } from "@/types/types";
import Image from "next/image";
import { CiCirclePlus, CiSaveDown2 } from "react-icons/ci";
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
  skypeNumber,
  websiteUrl,
}: UserProfile) => {
  return (
    <div className="bg-black text-white  flex flex-col items-center justify-between  min-h-screen  ">
      <div className=" w-full mx-auto  max-w-[480px] ">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className=" flex flex-col relative w-full  ">
          <div className="w-full  h-40 overflow-hidden">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                className="mx-auto "
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src={"/assets/template2coverphoto.png"}
                alt="Cover Image"
                width={400}
                height={100}
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2  ">
            {profilePictureUrl ? (
              <div className="w-[90px] h-40 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className=" w-[90px] h-40 rounded-full mx-auto flex items-center justify-center">
                <Image
                  src={"/assets/template3samplepic.png"}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-20 space-y-1">
          {firstName ? (
            <h1 className="text-xl font-bold mt-2 text-[#6fdc00] ">
              {firstName + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 text-[#6fdc00]">
              Hussain Watkins
            </h1>
          )}
          {position ?? (
            <p className="font-semibold text-white text-xs">
              Chief Technology Officer
            </p>
          )}
          {email ?? (
            <p className=" text-gray-600 text-xs">H.Watkins@gmail.com</p>
          )}
          {number ?? <p className=" text-gray-600 text-xs">+639123456789</p>}
        </div>

        {/* //TODO ADD URL HERE FOR ICONS; NULL if no url */}
        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center items-center my-4 ">
          <div className="grid grid-cols-4 gap-5">
            {facebookUrl ?? <FaFacebook size={24} />}
            {twitterUrl ?? <FaXTwitter size={24} />}
            {youtubeUrl ?? <FaYoutube size={24} />}
            {instagramUrl ?? <FaInstagram size={24} />}
            {linkedinUrl ?? <FaLinkedin size={24} />}
            {whatsappNumber ?? <FaWhatsapp size={24} />}
            {skypeNumber ?? <FaSkype size={24} />}
            {websiteUrl ?? <FaGlobe size={24} />}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-center space-x-4 mt-2">
          {/* Icon buttons */}

          <div className="flex flex-col justify-center items-center border-2 rounded-full py-2 px-8">
            <p className="text-xs">Save Contact</p>
          </div>
        </div>

        {/* COMPANY INFORMATION */}
        {company ?? (
          <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 text-[#6fdc00]">
            COMPANY
          </h2>
        )}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#6fdc00]">
            Company Background
          </h2>
          <p className="text-xs mt-1">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-sm font-bold mt-6 text-[#6fdc00]">
            Our Services
          </h3>
          <p className="text-xs mt-1">
            {serviceDescription ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 ">
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
      <div className="text-center text-xs text-gray-400 mt-8 mb-2">
        © 2024 ZwiftTech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template3;
