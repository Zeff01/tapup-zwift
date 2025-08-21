"use client";

import { MailIcon, MapPin, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const contactInfo = [
  // {
  //   title: "Location",
  //   icon: MapPin,
  //   text: "123 Tap Up Street, Manila, Philippines",
  //   url: "https://www.google.com/maps/place/GF,+mm-121,+Mall+of+Asia,+1300+Pacific+Dr,+Pasay,+Metro+Manila/@14.535199,120.9808556,17z/data=!4m6!3m5!1s0x3397cbfc631a33dd:0x5a802dacaf391a08!8m2!3d14.535199!4d120.982729!16s%2Fg%2F11y5z853v5?hl=en&entry=ttu&g_ep=EgoyMDI1MDIyMy4xIKXMDSoASAFQAw%3D%3D",
  // },
  {
    title: "Email",
    icon: MailIcon,
    text: "codebility.dev@gmail.com",
    url: "mailto:codebility.dev@gmail.com",
  },
  {
    title: "Phone",
    icon: PhoneIcon,
    text: "+63921090799",
    url: "tel:+63921090799",
  },
];

const Contact = () => {
  return (
    <section className="max-w-4xl w-full mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold ">Contact Us</h2>
      <p className="text-placeholder-input text-justify md:text-center text-sm md:text-lg dark:text-offWhiteTemplate mt-4">
        We value your interest and involvement in TapUp Community. Whether you
        have a questions, need support, or want to get more involved, we are
        here to help. Below are the ways you can reach out to us directly or
        stay connected through our updates.
      </p>

      <div className="mt-4 md:mt-8 text-left mx-auto flex flex-col md:flex-row justify-center items-center gap-4 max-w-screen-md w-full">
        <div className="flex gap-2 flex-col w-full ">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="flex flex-col p-2 gap-2 max-w-[450px] w-full rounded-sm"
            >
              <div>
                <h2 className="uppercase font-semibold flex gap-2  text-xl md:text-2xl">
                  <info.icon size={30} />
                  {info.title}
                </h2>
              </div>
              <Link
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-lg text-greenText hover:text-green-500"
              >
                {info.text}{" "}
              </Link>
            </div>
          ))}
        </div>
        <Image
          src={"/images/contactImg.png"}
          width={420}
          height={450}
          alt="contact image"
        />
      </div>
    </section>
  );
};

export default Contact;
