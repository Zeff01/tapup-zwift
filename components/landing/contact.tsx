"use client";

import { MailIcon, MapPin, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const contactInfo = [
  {
    title: "Location",
    icon: MapPin,
    text: "123 Tap Up Street, Manila, Philippines",
    url:""
  },
  {
    title:"Email",
  icon: MailIcon,
    text: "codebility.dev@gmail.com",
    url:"mailto:codebility.dev@gmail.com"
  },
  {
   title: "Phone",
       icon: PhoneIcon,
    text: "+63921090799",
    url:"tel:+63921090799"
  },
];

const Contact = () => {

  return (
    <section className="max-w-4xl w-full mx-auto p-6 text-center">
      <h2 className="text-4xl font-bold ">Contact Us</h2>
      <p className="text-placeholder-input text-justify md:text-center text-sm md:text-lg dark:text-offWhiteTemplate mt-4">
        We value your interest nd involvement in TapUp Community. Whether you
        have a questions, need support, or want to get more involved, we are
        here to help. Below are the ways you can reach out to us directly or
        stay connected through our updates.</p>

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
              {info.title }
              </h2>
              </div>
              <Link href={info.url} className="text-sm md:text-lg text-greenText hover:text-green-500">{info.text}</Link>
            </div>
          ))}
        </div>
        <Image src={"/images/contactImg.png"} width={420} height={450} alt="contact image" />
      </div>

    </section>
  );
};

export default Contact;
