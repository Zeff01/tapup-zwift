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
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Template14 = ({
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
        <div className="bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 text-gray-800 p-4 flex flex-col items-center justify-between min-h-screen relative">
            {/* Paper Texture Background */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.15) 1px, transparent 0),
                        linear-gradient(45deg, rgba(245, 245, 220, 0.1) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(245, 245, 220, 0.1) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, rgba(245, 245, 220, 0.1) 75%),
                        linear-gradient(-45deg, transparent 75%, rgba(245, 245, 220, 0.1) 75%)
                    `,
                    backgroundSize:
                        "10px 10px, 20px 20px, 20px 20px, 20px 20px, 20px 20px",
                    backgroundPosition: "0 0, 0 0, 10px 0, 0 10px, 10px 10px",
                }}
            ></div>

            {/* Paper grain effect */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(139, 69, 19, 0.03) 2px,
                            rgba(139, 69, 19, 0.03) 4px
                        ),
                        repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(139, 69, 19, 0.03) 2px,
                            rgba(139, 69, 19, 0.03) 4px
                        )
                    `,
                }}
            ></div>

            {/* Subtle artistic stains/watermarks */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-16 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-32 right-20 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
                <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-amber-200 rounded-full blur-2xl"></div>
            </div>

            <div className="w-full mx-auto max-w-[480px] relative z-10">
                {/* === Cover and Profile Section === */}
                <section aria-label="Cover and Profile Section" className="relative mb-6">
                    {/* Cover Photo */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200">
                        <Image
                            src={coverPhotoUrl || "/default-cover.jpg"}
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                        {/* Artistic overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Profile Picture */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-amber-200 overflow-hidden shadow-2xl bg-white">
                            <Image
                                src={profilePictureUrl || "/default-user.png"}
                                alt="Profile"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* === User Info Section === */}
                <section aria-label="User Information" className="text-center mt-16 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
                        {prefix && `${prefix}. `}
                        {firstName} {middleName && `${middleName} `}
                        {lastName}
                        {suffix && `, ${suffix}`}
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mb-3 rounded-full"></div>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-base text-amber-700 font-semibold">{position}</span>
                        {company && (
                            <>
                                <span className="text-amber-400 text-sm">•</span>
                                <span className="text-base text-gray-600 font-medium italic">{company}</span>
                            </>
                        )}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center gap-4 mb-6 flex-wrap">
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
                                        className={`p-2 ${social.bgColor} text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110`}
                                    >
                                        <IconComponent className="text-base" />
                                    </a>
                                );
                            })
                        }
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 w-full max-w-sm mx-auto">
                        <Link href={`mailto:${email}`} className="flex-1">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                                <FaEnvelope className="mr-2" />
                                Email Me!
                            </Button>
                        </Link>
                        <Button
                            onClick={() => downloadVCard(userProfile)}
                            className="flex-1 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white bg-transparent font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            <FaRegBookmark className="mr-2" />
                            Save
                        </Button>
                    </div>
                </section>

                {/* === Contact Info Section === */}
                <section aria-label="Contact Information" className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-amber-100 relative overflow-hidden">
                    {/* Artistic pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)`,
                        }}
                    ></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <FaEnvelope className="text-amber-600 text-lg" />
                            <span className="text-gray-700 font-medium">{email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-gray-700 font-medium">{number}</span>
                        </div>
                    </div>
                </section>

                {/* === Company Overview Section === */}
                {companyBackground && (
                    <section aria-label="Company Overview" className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-amber-100 relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)`,
                            }}
                        ></div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-amber-700 mb-3 font-serif">Company Overview</h2>
                            <p className="text-gray-700 leading-relaxed">{companyBackground}</p>
                        </div>
                    </section>
                )}

                {/* === Services Section === */}
                {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
                    <section aria-label="Our Services" className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg border border-amber-100 relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)`,
                            }}
                        ></div>
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold text-amber-700 mb-3 font-serif">Our Services</h2>
                            {serviceDescription && (
                                <p className="text-gray-700 leading-relaxed mb-4">{serviceDescription}</p>
                            )}
                            {servicePhotos && servicePhotos.length > 0 && (
                                <div className="grid grid-cols-2 gap-4">
                                    {servicePhotos.map((photo, index) => (
                                        <div key={index} className="relative h-32 rounded-xl overflow-hidden shadow-md border-2 border-amber-200">
                                            <Image
                                                src={photo}
                                                alt={`Service ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* === Footer Section === */}
                <footer className="text-center text-gray-500 text-sm py-4">
                    <div className="font-semibold text-amber-700 mb-1">{company}</div>
                    <div>© 2024 Zwiftech. All Rights Reserved.</div>
                </footer>
            </div>
        </div>
    );
};

export default Template14;


