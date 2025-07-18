import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import {
    FaEnvelope,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaGlobe,
    FaRegBookmark,
    FaTwitter,
    FaYoutube,
    FaWhatsapp,
    FaSkype,
    FaViber,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
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
    twitterUrl,
    youtubeUrl,
    whatsappNumber,
    skypeInviteUrl,
    websiteUrl,
    viberUrl,
    tiktokUrl,
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
        <div className="min-h-screen bg-[#001e36] flex items-center justify-center relative overflow-hidden py-2 px-1 text-white">
            <div className="max-w-[480px] mx-auto flex flex-col">
                {/* === Decorative Background === */}
                <div className="absolute top-10 left-10 w-48 h-48 rounded-full" style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(96, 165, 250, 0.15) 70%, rgba(37, 99, 235, 0.3) 100%)',
                    filter: 'blur(8px)'
                }}></div>
                <div className="absolute top-1/2 right-8 w-36 h-36 rounded-full" style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(34, 211, 238, 0.12) 70%, rgba(59, 130, 246, 0.25) 100%)',
                    filter: 'blur(8px)'
                }}></div>
                <div className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full" style={{
                    background: 'radial-gradient(circle, transparent 35%, rgba(147, 197, 253, 0.1) 75%, rgba(99, 102, 241, 0.2) 100%)',
                    filter: 'blur(10px)'
                }}></div>

                {/* === Cover and Profile Section === */}
                <section aria-label="Cover and Profile Section" className="relative px-5 pb-6">
                    {/* Cover Image */}
                    <div className="relative h-64 bg-cover bg-center rounded-t-[30px]" style={{ backgroundImage: `url(${coverPhotoUrl})` }} />

                    {/* Profile Content */}
                    <div className="-mt-20 px-8">
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
                                    {prefix && `${prefix}. `}
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
                                <div className="flex flex-wrap justify-center gap-3 mt-4 text-white max-w-xs mx-auto">
                                    {[
                                        { url: facebookUrl, icon: FaFacebookF, href: facebookUrl, bgColor: "bg-blue-600 hover:bg-blue-700" },
                                        { url: linkedinUrl, icon: FaLinkedinIn, href: linkedinUrl, bgColor: "bg-blue-500 hover:bg-blue-600" },
                                        { url: instagramUrl, icon: FaInstagram, href: instagramUrl, bgColor: "bg-pink-500 hover:bg-pink-600" },
                                        { url: twitterUrl, icon: FaTwitter, href: twitterUrl, bgColor: "bg-sky-500 hover:bg-sky-600" },
                                        { url: youtubeUrl, icon: FaYoutube, href: youtubeUrl, bgColor: "bg-red-600 hover:bg-red-700" },
                                        { url: whatsappNumber, icon: FaWhatsapp, href: `https://wa.me/${whatsappNumber}`, bgColor: "bg-green-500 hover:bg-green-600" },
                                        { url: skypeInviteUrl, icon: FaSkype, href: skypeInviteUrl, bgColor: "bg-blue-400 hover:bg-blue-500" },
                                        { url: viberUrl, icon: FaViber, href: viberUrl, bgColor: "bg-purple-500 hover:bg-purple-600" },
                                        { url: tiktokUrl, icon: SiTiktok, href: tiktokUrl, bgColor: "bg-black hover:bg-gray-800" },
                                        { url: websiteUrl, icon: FaGlobe, href: websiteUrl, bgColor: "bg-gray-600 hover:bg-gray-700" },
                                    ]
                                        .filter(social => social.url)
                                        .map((social, index) => {
                                            const IconComponent = social.icon;
                                            return (
                                                <a
                                                    key={index}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`p-2 ${social.bgColor} rounded-full transition`}
                                                >
                                                    <IconComponent className="text-sm" />
                                                </a>
                                            );
                                        })
                                    }
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 mt-4">
                                    {/* Email Me - Larger */}
                                    <div className="basis-[65%]">
                                        <Link href={`mailto:${email}`}>
                                            <Button className="w-full bg-[#00d4ff] hover:bg-[#00c4e6] text-[#0f172a] text-sm font-semibold py-2 px-6 rounded-full flex items-center justify-center gap-2">
                                                <FaEnvelope />
                                                Email Me!
                                            </Button>
                                        </Link>
                                    </div>

                                    {/* Save - Smaller */}
                                    <div className="basis-[35%]">
                                        <Button
                                            onClick={() => downloadVCard(userProfile)}
                                            className="w-full border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#0f172a] bg-transparent text-sm font-semibold py-2 px-2 rounded-full flex items-center justify-center gap-2"
                                        >
                                            <FaRegBookmark />
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* === Company Overview Section === */}
                {companyBackground && (
                    <section aria-label="Company Overview" className="text-white px-4 sm:px-6 pb-3 text-sm">
                        <h3 className="text-[#00d4ff] font-semibold mb-1">
                            Company Overview
                        </h3>
                        <p className="text-gray-300 mb-4">{companyBackground}</p>
                    </section>
                )}

                {/* === Services Section === */}
                {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
                    <section aria-label="Our Services" className="text-white px-4 sm:px-6 pb-3 text-sm">
                        {serviceDescription && (
                            <>
                                <h3 className="text-[#00d4ff] font-semibold mb-1">
                                    Our Services
                                </h3>
                                <p className="text-gray-300 mb-4">{serviceDescription}</p>
                            </>
                        )}

                        {servicePhotos && servicePhotos.length > 0 && (
                            <div className="grid grid-cols-2 gap-3 auto-rows-auto">
                                {servicePhotos.map((photo, idx) => {
                                    const isLarge = idx % 2 === 0; // alternate tall and short

                                    return (
                                        <div
                                            key={idx}
                                            className={`overflow-hidden rounded-xl ${isLarge ? 'row-span-2 h-64' : 'row-span-1 h-32'
                                                }`}
                                        >
                                            <img
                                                src={photo}
                                                alt={`Service ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                )}

                {/* === Footer Section === */}
                <footer className="bg-[#001d34] text-white text-center py-4 text-xs rounded-b-[30px]">
                    <div className="font-semibold text-sm">{company}</div>
                    <div>© 2024 Zwiftech. All Rights Reserved.</div>
                </footer>
            </div>
        </div>
    );
};

export default Template18;
