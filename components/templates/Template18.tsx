import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import {
    FaEnvelope,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaGlobe,
    FaRegBookmark,
} from "react-icons/fa";
import { LuMail, LuBookmark } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";

const Template18 = ({
    id,
    firstName,
    lastName,
    middleName,
    suffix,
    prefix,
    position,
    coverPhotoUrl,
    profilePictureUrl,
    email,
    number,
    company,
    companyBackground,
    serviceDescription,
    servicePhotos,
    facebookUrl,
    linkedinUrl,
    instagramUrl,
    websiteUrl,
    customUrl,
}: Card) => {
    const userProfile = {
        id,
        firstName,
        lastName,
        email,
        number,
        company,
        position,
        websiteUrl,
        customUrl,
    };

    return (
        <div className="min-h-screen w-full bg-[#001e36] flex items-center justify-center py-2">
            <div className="w-full max-w-[480px] font-sans text-white rounded-[30px] overflow-hidden">
                {/* Cover Photo (decorative) */}
                <div
                    className="relative h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${coverPhotoUrl})` }}
                />

                {/* Profile Card */}
                <div className="-mt-20 px-4">
                    <div className="bg-[#123B57] rounded-xl px-5 py-6 shadow-lg relative text-center">
                        {/* Profile Picture */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                                <img
                                    src={profilePictureUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="mt-9">
                            <h2 className="text-lg font-bold">
                                {prefix && `${prefix} `}
                                {firstName} {middleName && `${middleName} `}
                                {lastName}
                                {suffix && `, ${suffix}`}
                            </h2>
                            <div className="text-sm mt-1">
                                {company} {position && `| ${position}`}
                            </div>
                            <div className="text-xs mt-1 break-words text-gray-300">
                                {email && (
                                    <>
                                        {email}
                                        {number && ` | ${number}`}
                                    </>
                                )}
                                {!email && number && number}
                            </div>

                            {/* Social Icons */}
                            <div className="flex justify-center gap-4 mt-4 text-white">
                                {facebookUrl && <a href={facebookUrl}><FaFacebookF /></a>}
                                {linkedinUrl && <a href={linkedinUrl}><FaLinkedinIn /></a>}
                                {instagramUrl && <a href={instagramUrl}><FaInstagram /></a>}
                                {websiteUrl && <a href={websiteUrl}><FaGlobe /></a>}
                            </div>

                            {/* About */}
                            <p className="text-sm mt-4 text-gray-300">
                                Creative and detail-oriented UI/UX Designer passionate about
                                crafting intuitive digital experiences that delight users and
                                drive results.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-2 mt-4">
                                <Link href={`mailto:${email}`} className="flex-1">
                                    <Button className="w-full bg-[#33d2c1] hover:bg-[#2ac6b5] text-[#0f172a] text-sm font-semibold py-2 px-6 rounded-full flex items-center justify-center gap-2">
                                        <FaEnvelope /> Email Me!
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => downloadVCard(userProfile)}
                                    className="flex-1 border border-[#33d2c1] text-[#33d2c1] hover:bg-[#33d2c1] hover:text-[#0f172a] bg-transparent text-sm font-semibold py-2 px-2 rounded-full flex items-center justify-center gap-2"
                                >
                                    <FaRegBookmark /> Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Overview & Services */}
                <div className="text-white px-6 pt-6 pb-4 text-sm mt-4">
                    {companyBackground && (
                        <>
                            <h3 className="text-[#00d4ff] font-semibold mb-1">
                                Company Overview
                            </h3>
                            <p className="text-gray-300 mb-4">{companyBackground}</p>
                        </>
                    )}
                    {serviceDescription && (
                        <>
                            <h3 className="text-[#00d4ff] font-semibold mb-1">
                                Our Services
                            </h3>
                            <p className="text-gray-300 mb-4">{serviceDescription}</p>
                        </>
                    )}
                </div>

                {/* Service Images */}
                {servicePhotos && servicePhotos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 px-4 pb-6">
                        {servicePhotos.slice(0, 4).map((photo, idx) => (
                            <div key={idx} className="aspect-square rounded-xl overflow-hidden">
                                <img
                                    src={photo}
                                    alt={`Service ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="bg-[#001d34] text-white text-center py-4 text-xs rounded-b-[30px]">
                    <div className="font-semibold text-sm">{company}</div>
                    <div>© 2024 Zwiftech. All Rights Reserved.</div>
                </div>
            </div>
        </div>
    );
};

export default Template18;
