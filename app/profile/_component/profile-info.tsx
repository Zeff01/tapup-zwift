import Image from "next/image";
import profilePic from "@/public/assets/template4samplepic.png";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsBoxArrowInDown } from "react-icons/bs";
import profileBgImage from "@/public/assets/profileImage.png";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full p-0">
      <div className="relative w-full h-[30vh] p-0 m-0">
        <Image
          src={profileBgImage}
          alt="Profile image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex justify-between w-full shadow-xl">
        <div className="flex flex-col justify-center">
          <div className="w-[7rem] relative h-[7rem] bottom-[3rem] left-9">
            <Image
              src={profilePic}
              alt="user image"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-10 relative bottom-10">
            <h3 className="font-bold text-2xl">Paul Castellano</h3>
            <p className="font-medium text-base">CEO</p>
            <p className="font-medium text-base">Stark Industries</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center pt-5 px-5 ">
          <FiPhoneCall className="w-7 h-7"/>
          <MdOutlineEmail className="w-7 h-7"/>
          <BsBoxArrowInDown className="w-7 h-7"/>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo;