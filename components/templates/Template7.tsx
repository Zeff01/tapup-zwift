import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,  
  FaPhone,
  FaFacebookMessenger
} from "react-icons/fa6";
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
                            className="w-full h-52 object-cover overflow-hidden"
                        />
                        ) : (
                        <Image
                            src={"/assets/template-7-cover-photo.jpeg"}
                            alt="Cover Image"
                            width={400}
                            height={200}
                            priority={false}
                            className="w-full h-52 object-cover overflow-hidden"
                        />
                        )}
                    </div>
                    <div className="absolute -bottom-16 rounded-xl left-1/4 transform -translate-x-24 bg-offWhiteTemplate border-8 border-offWhiteTemplate h-custom-29 w-custom-29">
                        {profilePictureUrl ? (
                        <div className="rounded-xl">
                            <Image
                            src={profilePictureUrl}
                            alt="Profile Image"
                            className="rounded-xl"
                            />
                        </div>
                        ) : (
                            <div className="rounded-[20px]">
                                <Image
                                src={"/assets/template-7-profile-picture.jpeg"}
                                alt="Profile Image"
                                fill
                                className="rounded-xl"
                                />
                            </div>
                        )}
                    </div>
                     
                </div>
                <div className="flex flex-col px-5">
                    {/* PERSONAL INFORMATION */}
                <div className="mt-20 space-y-1">
                    {firstName ? (
                        <h1 className="text-xl font-bold mt-4 text-blue-600 ">
                        {firstName + " " + lastName}
                        </h1>
                    ) : (
                        <h1 className="text-xl font-bold mt-2 text-blue-600 ">Janna Marie Smith</h1>
                    )}
                    <p className="font-semibold text-grayTemplate">
                        {position ?? "ABC Company | UI/UX Designer"}
                    </p>
                    <p className=" text-grayTemplate text-xs">
                        {email ?? "jannamariesmith@gmail.com"}
                    </p>
                    <p className=" text-grayTemplate text-xs"> {number ?? '+639123456789'}</p>
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
                    <Button className="col-span-2 bg-blueTemplate hover:bg-blueTemplate text-white">Email Me</Button>
                    <Button className="bg-gray-500 text-white">Save</Button>
                </div>
                {/*COMPANY DETAILS */}
                <div className="flex flex-col mt-5">
                    <div className="text-xl text-blue-600 font-bold mb-5">
                        {company ?? 'ABC Company'}
                    </div>
                    <div className="flex flex-col gap-y-2 mb-3">
                        <div className="text-gray-500 text-xs font-semibold">Company Overview</div>
                        <div className="text-gray-500 text-2xs font-normal leading-4">
                        Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh 
                        faucibus. Laoreet at hendrerit at viverra dignissim consequat posuere mi cras.
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 mb-3">
                        <div className="text-gray-500 text-xs font-semibold">Our Services</div>
                        <div className="text-gray-500 text-2xs font-normal leading-4">
                        {serviceDescription ?? 'Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. Laoreet at hendrerit at viverra '}
                        </div>
                    </div>
                </div>
                {/*Photos */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-y-2">
                            <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                                <div className="relative h-48">
                                    <Image
                                        src={"/assets/template-7-image1.jpeg"}
                                        alt="Image"
                                        className="rounded-lg"
                                        fill
                                    ></Image>
                                </div>
                            </div>
                            <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                                <div className="relative h-32">
                                    <Image
                                        src={"/assets/template-7-image2.jpeg"}
                                        alt="Image"
                                        className="rounded-lg"
                                        fill
                                    ></Image>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                                <div className="relative h-32">
                                    <Image
                                        src={"/assets/template-7-image2.jpeg"}
                                        alt="Image"
                                        className="rounded-lg"
                                        fill
                                    ></Image>
                                </div>
                            </div>
                            <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                                <div className="relative h-48">
                                    <Image
                                        src={"/assets/template-7-image1.jpeg"}
                                        alt="Image"
                                        className="rounded-lg shadow-lg object-cover"
                                        fill
                                    ></Image>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Footer */}
                    <div className="flex flex-col items-center my-3 gap-y-3">
                        <div className="text-base text-footerBlueTemplate font-bold">
                            {company ?? 'ABC Company'}
                        </div>
                        <div className="flex justify-center gap-2.5">
                            <Button className="rounded-full h-2xs w-2xs">
                                <FaFacebookMessenger className="" />
                            </Button>
                            <Button className="rounded-full h-2xs w-2xs">
                                <FaFacebook className="" />
                            </Button>
                            <Button className="rounded-full h-2xs w-2xs">
                                <FaInstagram className="" />
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-3xs text-gray-500 font-light">Copyright 2024 ABC Company. All Right Reserved</p>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default Template7;