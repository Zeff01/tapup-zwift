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
  FaFacebookMessenger,
  FaBookmark,
} from "react-icons/fa6";
import { downloadVCard } from "@/lib/utils";
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
                    <div className="w-full h-[244px] bg-gradient-radial from-white to-blue-700"></div>
                    {/* Profile picture and bookmark icon */}
                    <div className="absolute rounded-full bg-[#F2F2F2] transform left-[11rem] -bottom-16 w-[120px] h-[120px] border-[#F2F2F2] border-[8px]">
                        <Image
                            src={'/assets/template-8-profile-picture.jpeg'}
                            fill
                            alt="profile picture"
                            className="rounded-full"
                        />
                    </div>
                    <Button className="absolute rounded-full left-[20rem] -bottom-5 w-[24px] h-[24px] bg-[#F2F2F2] border-[#F2F2F2] border-[8px]">
                        <FaBookmark />
                    </Button>
                </div>
                 {/* Profile details */}
                <div className="flex justify-center mt-20">
                    <h1 className="text-xl font-extrabold text-[#143583] leading-[25.1px]">Janna Marie Smith</h1>
                </div>
             </div>
            
        </div>
    )

}

export default Tempate8