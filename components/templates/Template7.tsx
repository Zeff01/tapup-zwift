import { Card } from "@/types/types";
import Image from "next/image";
import { CiMail, CiPhone, CiSaveDown2 } from "react-icons/ci";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,  
  FaPhone,
  FaFacebookMessenger
} from "react-icons/fa6";
import { downloadVCard } from "@/lib/utils";
import {Button} from "@/components/ui/button";

const Template7 = ({
    profilePictureUrl,
    coverPhotoUrl,
    position,
    company,
    serviceDescription,
    firstName,
    lastName,
    email,
    number,
    facebookUrl,
    youtubeUrl,
    instagramUrl,
    twitterUrl,
    linkedinUrl,
    websiteUrl
}: Card) => {

    const userProfile = {
        firstName,
        lastName,
        email,
        number,
        company,
        position,
        websiteUrl
    }

    return (
        <div className="bg-white text-black p-4 flex flex-col justify-between min-h-screen">
            <div className="w-full mx-auto  max-w-[480px]">
                <div className="flex flex-col relative">
                    <div className="w-full h-48">
                    {coverPhotoUrl ? (
                        <Image
                            src={coverPhotoUrl}
                            alt="Cover Image"
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-[2rem] overflow-hidden"
                        />
                        ) : (
                        <Image
                            src={"/assets/template1coverphoto.png"}
                            alt="Cover Image"
                            width={400}
                            height={200}
                            className=""
                        />
                        )}
                    </div>
                    <div className="absolute -bottom-20 rounded left-1/4 transform -translate-x-24 p-2 bg-white border border-blue-600">
                        {profilePictureUrl ? (
                        <div className="w-28 h-28 overflow-hidden">
                            <Image
                            src={profilePictureUrl}
                            alt="Profile Image"
                            width={80}
                            height={80}
                            className="rounded-full w-24 h-24"
                            />
                        </div>
                        ) : (
                        <div className="bg-purple-500 w-28 h-28 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">HW</span>
                        </div>
                        )}
                    </div>
                     
                </div>
                {/* PERSONAL INFORMATION */}
                <div className="mt-28 space-y-1 pl-5">
                    {firstName ? (
                        <h1 className="text-xl font-bold mt-4 text-blue-600 ">
                        {firstName + " " + lastName}
                        </h1>
                    ) : (
                        <h1 className="text-xl font-bold mt-2 text-blue-600 ">Hussain Watkins</h1>
                    )}
                    <p className="font-semibold text-gray-500">
                        {position ?? "Chief Technology Officer"}
                    </p>
                    <p className=" text-gray-500 text-xs">
                        {email ?? "H.Watkins@gmail.com"}
                    </p>
                    <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
                </div>
                {/* SOCIALS */}
                <div className="flex pl-5 mt-3 gap-2">
                    <Button className="rounded-full"><FaFacebook /></Button>
                    <Button className="rounded-full"><FaFacebookMessenger /></Button>
                    <Button className="rounded-full"><FaInstagram /></Button>
                    <Button className="rounded-full"><FaLinkedin /></Button>
                    <Button className="rounded-full"><FaEnvelope /></Button>
                    <Button className="rounded-full"><FaPhone /></Button>
                    <Button className="rounded-full"><FaGlobe /></Button>
                </div>
                {/* CTA BUTTONS */}
                <div className="grid grid-cols-3 gap-4 mt-5">
                    <Button className="col-span-2 bg-blue-600 text-white">Email Me</Button>
                    <Button className="bg-gray-500 text-white">Save</Button>
                </div>
                {/*COMPANY DETAILS */}
                <div className="flex flex-col mt-5">
                    <div className="text-xl text-blue-600 font-bold mb-5">
                        {company ?? 'ABC Company'}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="text-gray-500 text-xs font-semibold">Company Overview</div>
                        <div className="text-gray-500 text-[10px] font-normal leading-4">
                        Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh 
                        faucibus. Laoreet at hendrerit at viverra dignissim consequat posuere mi cras.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Template7;