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

const Template1 = ({
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
    <div className="bg-white text-black p-4 flex flex-col items-center justify-between  min-h-screen">
      <div className=" w-full mx-auto  max-w-[480px]">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="mt-2  flex flex-col relative rounded-4xl mx-4 ">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400} // Adjust width and height as necessary
                height={200}
                className="mx-auto"
              />
            ) : (
              <Image
                src={"/assets/template1coverphoto.png"}
                alt="Cover Image"
                width={400} // Adjust width and height as necessary
                height={200}
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2  ">
            {profilePictureUrl ? (
              <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="bg-purple-500 w-20 h-20 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
            )}
          </div>
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-8 space-y-.5">
          {firstName ? (
            <h1 className="text-xl font-bold mt-2 ">{firstName + lastName}</h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}
          {position ?? (
            <p className="font-semibold text-gray-900 text-xs">
              Chief Technology Officer
            </p>
          )}
          {email ?? (
            <p className=" text-gray-500 text-xs">H.Watkins@gmail.com</p>
          )}
          {number ?? <p className=" text-gray-500 text-xs">+639123456789</p>}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-center space-x-4 mt-2">
          {/* Icon buttons */}
          <div className="flex flex-col justify-center items-center">
            <CiCirclePlus size={32} className="cursor-pointer" />
            <p className="text-xs">Add</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiSaveDown2 size={32} className="cursor-pointer" />
            <p className="text-xs">Save</p>
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center gap-6 my-4">
          {facebookUrl ?? <FaFacebook size={24} />}
          {twitterUrl ?? <FaXTwitter size={24} />}
          {youtubeUrl ?? <FaYoutube size={24} />}
          {instagramUrl ?? <FaInstagram size={24} />}
          {linkedinUrl ?? <FaLinkedin size={24} />}
          {whatsappNumber ?? <FaWhatsapp size={24} />}
          {skypeNumber ?? <FaSkype size={24} />}
          {websiteUrl ?? <FaGlobe size={24} />}
        </div>
        <hr />

        {/* COMPANY INFORMATION */}
        {company ?? (
          <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6">
            COMPANY
          </h2>
        )}
        <div className="mt-6">
          <h2 className="text-sm font-bold">Company Background</h2>
          <p className="text-xs mt-1">
            {companyBackground ??
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

          {/* SERVICE INFORMATION */}
          <h3 className="text-sm font-bold mt-6">Our Services</h3>
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
      <div className="text-center text-xs text-gray-800 mt-8 mb-2">
        © 2024 ZwiftTech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template1;
