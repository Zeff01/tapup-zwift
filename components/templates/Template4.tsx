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

const Template4 = ({
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
    <div className="bg-white text-black flex flex-col items-center justify-between  min-h-screen">
      <div className=" w-full mx-auto  max-w-[480px]">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className=" flex flex-col relative w-full  ">
          <div className="w-full  h-40 overflow-hidden">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400} // Adjust width and height as necessary
                height={200}
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
          <div className="absolute -bottom-14 left-4 ">
            {profilePictureUrl ? (
              <div className=" rounded-full mx-auto overflow-hidden">
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
        <div className="flex justify-end space-x-4 pr-4 pt-2">
          {/* Icon buttons */}
          <div className="flex flex-col justify-center items-center">
            <CiSaveDown2 size={32} className="cursor-pointer" />
            <p className="text-xs">Save</p>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="mt-4 space-y-1 px-4 mb-4">
          {firstName ? (
            <h1 className="text-xl font-bold mt-2 ">{firstName + lastName}</h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}
          {position ?? (
            <p className="font-semibold text-gray-500 text-xs">SALES MANAGER</p>
          )}
          {email ?? (
            <p className="font-semibold text-gray-500 text-xs">
              H.Watkins@gmail.com
            </p>
          )}
          {number ?? (
            <p className="font-semibold text-gray-500 text-xs">+639123456789</p>
          )}
        </div>

        <hr />

        {/* COMPANY INFORMATION */}
        {company ?? (
          <h2 className="text-4xl font-bold mx-auto w-full px-4 mt-6">
            COMPANY
          </h2>
        )}
        <div className="mt-6 px-4">
          <h2 className="text-md font-bold">Company Background</h2>
          <p className="text-xs mt-1">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-md font-bold mt-6">Our Services</h3>
          <p className="text-xs mt-1">
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
      <div className="flex flex-col justify-center items-center my-4 mt-8">
        <h1 className="font-bold mb-2">Socials</h1>
        <div className="flex   gap-6">
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
      {/* FOOTER */}
      <div className="text-center text-xs text-gray-800 mt-8 mb-2">
        © 2024 ZwiftTech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template4;
