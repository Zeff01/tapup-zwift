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
                    <div className="absolute rounded-full bg-[#D9D9D9] transform left-[11rem] -bottom-16 w-[120px] h-[120px] border-[#D9D9D9] border-[8px]">
                        <Image
                            src={'/assets/template-8-profile-picture.jpeg'}
                            fill
                            alt="profile picture"
                            className="rounded-full"
                        />
                    </div>
                </div>
                
             </div>
        </div>
    )

}

export default Tempate8