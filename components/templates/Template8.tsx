import { Card } from "@/types/types";
import Image from "next/image";
import { Bookmark } from 'lucide-react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,  
  FaPhone,
  FaFacebookMessenger,
  FaBookmark,
} from "react-icons/fa6";
import {Button} from "@/components/ui/button";

const Tempate8 =  ({
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
                    <div className="absolute rounded-full bg-[#F2F2F2] transform left-[10rem] -bottom-1 w-[120px] h-[120px] border-[#F2F2F2] border-[8px]">
                        <Image
                            src={'/assets/template-8-profile-picture.jpeg'}
                            fill
                            alt="profile picture"
                            className="rounded-full"
                        />
                    </div>
                    <Button className="absolute rounded-[20px] transform left-[19rem] top-[10rem] w-[40px] h-[40px] bg-[#F2F2F2] hover:bg-[#F2F2F2]">
                        <Bookmark className="w-[24px] h-[24px]" />
                    </Button>
                </div>
                 {/* Profile details */}
                <div className="flex flex-col items-center mt-[1.5rem] gap-2 mb-5">
                    <h1 className="text-xl font-extrabold text-[#143583] leading-[25.1px]">Janna Marie Smith</h1>
                    <p className="text-xs font-semibold leading-[15.06px] text-[#959595]">ABC Company | UI/UX Designer</p>
                    <p className="font-normal text-[#959595] text-[10px] leading-[12.55px]">jannamariesmith@gmail.com</p>
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
                    <Button className="rounded-[20px] bg-[#143583] text-white w-full hover:bg-[#143583]">Email me!</Button>
                </div>
                {/*COMPANY DETAILS */}
                <div className="flex flex-col justify-start gap-[12px]">
                    <h1 className="text-base font-extrabold leading-[30.12px] text-[#143583]">ABC Company</h1>
                    <h5 className="text-xs font-extrabold leading-[15.06px] text-[#959595]">Company Overview</h5>
                    <p className="text-[10px] leading-4 font-light text-[#959595]">Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. 
                        Laoreet at hendrerit at viverra dignissim consequat posuere mi cras.</p>
                    <h5 className="text-xs font-extrabold leading-[15.06px] text-[#959595]">Our Services</h5>
                    <p className="text-[10px] leading-4 font-light text-[#959595]">Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. 
                        Laoreet at hendrerit at viverra</p>
                    {/*Photos */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-y-2">
                            <div className="relative h-[140px] p-2 rounded-2xl bg-[#F2F2F2]">
                                <div className="relative h-[7.8rem]">
                                    <Image
                                        src={'/assets/template-7-image1.jpeg'}
                                        fill
                                        alt="photo"
                                        className="rounded-[8px]"
                                    />
                                </div>
                            </div>
                            <div className="relative h-[140px] p-2 rounded-2xl bg-[#F2F2F2]">
                                <div className="relative h-[7.8rem]">
                                    <Image
                                        src={'/assets/template-7-image2.jpeg'}
                                        fill
                                        alt="photo"
                                        className="rounded-[8px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative h-full p-2 rounded-2xl bg-[#F2F2F2]">
                            <div className="relative h-[270]">
                                <Image
                                    src={'/assets/template-8-image1.jpeg'}
                                    fill
                                    alt="photo"
                                    className="rounded-[8px]"
                                />
                            </div>
                        </div>
                    </div>
                    {/*Footer */}
                    <div className="flex flex-col items-center my-3 gap-y-3">
                        <div className="text-base text-[#143583] font-bold">
                            {company ?? 'ABC Company'}
                        </div>
                        <div className="flex justify-center gap-2.5">
                            <Button className="rounded-full h-[28px] w-[28px]">
                                <FaFacebookMessenger className="" />
                            </Button>
                            <Button className="rounded-full h-[28px] w-[28px]">
                                <FaFacebook className="" />
                            </Button>
                            <Button className="rounded-full h-[28px] w-[28px]">
                                <FaInstagram className="" />
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-[8px] text-gray-500 font-light">Copyright 2024 ABC Company. All Right Reserved</p>
                        </div>
                    </div>
                </div>
             </div>
            
        </div>
    )

}

export default Tempate8