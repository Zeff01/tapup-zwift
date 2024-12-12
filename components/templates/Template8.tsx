import { Card } from "@/types/types";
import Image from "next/image";
import { CiMail, CiPhone, CiSaveDown2 } from "react-icons/ci";
import {Button} from "@/components/ui/button";
import {Bookmark} from "lucide-react"
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaSkype,
  FaGlobe,
  FaFacebookMessenger,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa6";
import { downloadVCard } from "@/lib/utils";

const Template8 = ({
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
        <div className="bg-white text-black p-4 flex flex-col justify-between min-h-screen">
             <div className="w-full mx-auto  max-w-[480px]">
                <div className="flex flex-col relative">
                    {/*Cover Color Gradient */}
                    <div className="w-full h-[244px] bg-[radial-gradient(circle_at_top_left,_#ffffff_1%,_#1d4ed8_90%)]">
                    <svg
                        className="absolute bottom-0 left-0 w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                    >
                        <path
                        fill="#ffffff"
                         d="M0,200 C480,96 960,96 1440,200 L1440,320 L0,320 Z"
                        ></path>
                    </svg>
                    </div>
                    {/* Profile picture and bookmark icon */}
                    <div className="absolute rounded-full bg-offWhiteTemplate transform left-40 -bottom-1 w-custom-29 h-custom-29 border-offWhiteTemplate border-2xs">
                        <Image
                            src={'/assets/template-8-profile-picture.jpeg'}
                            fill
                            alt="profile picture"
                            className="rounded-full"
                        />
                    </div>
                    <Button className="absolute rounded-xl transform left-[19rem] top-40 w-10 h-10 bg-offWhiteTemplate hover:bg-offWhiteTemplate">
                        <Bookmark className="w-6 h-6" />
                    </Button>
                </div>
                 {/* Profile details */}
                <div className="flex flex-col items-center mt-6 gap-2 mb-5">
                    <h1 className="text-xl font-extrabold text-footerBlueTemplate leading-[25.1px]">Janna Marie Smith</h1>
                    <p className="text-xs font-semibold leading-4 text-grayTemplate">ABC Company | UI/UX Designer</p>
                    <p className="font-normal text-grayTemplate text-xs leading-3">jannamariesmith@gmail.com</p>
                </div>
                <div className="flex justify-center gap-2 mb-5">
                    <Button className="rounded-full"><FaFacebook /></Button>
                    <Button className="rounded-full"><FaFacebookMessenger /></Button>
                    <Button className="rounded-full"><FaInstagram /></Button>
                    <Button className="rounded-full"><FaLinkedin /></Button>
                    <Button className="rounded-full"><FaEnvelope /></Button>
                    <Button className="rounded-full"><FaPhone /></Button>
                    <Button className="rounded-full"><FaGlobe /></Button>
                </div>
                {/* CTA BUTTON */}
                <div className="mb-5">
                    <Button className="rounded-xl bg-footerBlueTemplate text-white w-full hover:bg-footerBlueTemplate">Email me!</Button>
                </div>
                {/*COMPANY DETAILS */}
                <div className="flex flex-col justify-start gap-3">
                    <h1 className="text-base font-extrabold leading-8 text-footerBlueTemplate">ABC Company</h1>
                    <h5 className="text-xs font-extrabold leading-4 text-grayTemplate">Company Overview</h5>
                    <p className="text-2xs leading-4 font-light text-grayTemplate">Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. 
                        Laoreet at hendrerit at viverra dignissim consequat posuere mi cras.</p>
                    <h5 className="text-xs font-extrabold leading-4 text-grayTemplate">Our Services</h5>
                    <p className="text-2xs leading-4 font-light text-grayTemplate">Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. 
                        Laoreet at hendrerit at viverra</p>
                    {/*Photos */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-y-2">
                            <div className="relative h-36 p-2 rounded-2xl bg-offWhiteTemplate">
                                <div className="relative h-32">
                                    <Image
                                        src={'/assets/template-7-image1.jpeg'}
                                        fill
                                        alt="photo"
                                        className="rounded-2xs"
                                    />
                                </div>
                            </div>
                            <div className="relative h-36 p-2 rounded-2xl bg-offWhiteTemplate">
                                <div className="relative h-32">
                                    <Image
                                        src={'/assets/template-7-image2.jpeg'}
                                        fill
                                        alt="photo"
                                        className="rounded-2xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full p-2 rounded-2xl bg-[#F2F2F2]">
                            <div className="relative h-custom-278">
                                <Image
                                    src={'/assets/template-8-image1.jpeg'}
                                    fill
                                    alt="photo"
                                    className="rounded-2xs"
                                />
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
                            <p className="text-2xs text-gray-500 font-light">Copyright 2024 ABC Company. All Right Reserved</p>
                        </div>
                    </div>
                </div>
             </div>
            
        </div>
    )

}

export default Template8