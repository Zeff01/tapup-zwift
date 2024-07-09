import { UserProfile } from "@/types/types";
import Image from "next/image";
import { CiMail, CiSaveDown2, CiPhone } from "react-icons/ci";
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
  whatsappUrl,
  skypeUrl,
  websiteUrl,
}: UserProfile) => {
  const handleSaveVCard = () => {
    if (!email) {
      console.error("No email available for vCard");
      return;
    }

    // Manually create vCard data
    let vCardString = "BEGIN:VCARD\n";
    vCardString += "VERSION:3.0\n";
    vCardString += `FN:${firstName} ${lastName}\n`;
    vCardString += `N:${lastName};${firstName};;;\n`;
    vCardString += `ORG:${company}\n`;
    vCardString += `TITLE:${position}\n`;
    vCardString += `TEL;TYPE=CELL:${number}\n`;
    vCardString += `EMAIL:${email}\n`;
    vCardString += `URL:${websiteUrl}\n`;
    vCardString += "END:VCARD";

    // Create a Blob from the vCard String
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${firstName}_${lastName}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black text-white p-4 flex flex-col items-center justify-between  min-h-screen">
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
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2  ">
            {profilePictureUrl ? (
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
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
        <div className="text-center mt-10 space-y-1 ">
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
        <div className="flex justify-center space-x-4 mt-2">
          {/* Icon buttons */}
          <div className="flex flex-col justify-center items-center">
            <a href={`tel:${number}`} className="text-decoration-none">
              <CiPhone size={32} className="cursor-pointer" />
            </a>
            <p className="text-xs">Call</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <a href={`mailto:${email}`}>
              <CiMail size={32} className="cursor-pointer" />
            </a>
            <p className="text-xs">Email</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <CiSaveDown2
              size={32}
              className="cursor-pointer"
              onClick={handleSaveVCard}
            />
            <p className="text-xs">Save</p>
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex justify-center gap-6 my-4">
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
          {whatsappUrl && (
            <a
              href={`https://wa.me/${whatsappUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={24} />
            </a>
          )}
          {skypeUrl && (
            <a
              href={`skype:${skypeUrl}?call`}
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
        <hr />

        {/* COMPANY INFORMATION */}
        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6">
          {company ?? "COMPANY"}
        </h2>
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
        © 2024 ZwiftTech. All Right Reserved.
      </div>
    </div>
  );
};

export default Template1;
