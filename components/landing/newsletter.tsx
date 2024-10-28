import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const listItem = [
  {
    title: "Product",
    list: ["Black Card", "Yellow Card", "Blue Card"],
  },
  {
    title: "Information",
    list: ["News", "Testimonials", "Feedback"],
  },
  {
    title: "Company",
    list: ["Customer Service", "Terms of Use", "Privacy", "About"],
  },
];

const Newsletter = () => {
  return (
    <section className="flex flex-col md:flex-row justify-evenly gap-3 lg:gap-6 md:pb-[4rem] shadow-xl pb-2">
      <div className="lg:w-[25rem] md:w-[18rem] mx-auto md:mx-2  w-[15rem] p-5 flex gap-4 flex-col border-gray-200 rounded-md border-2">
        <h5 className="font-semibold text-xl">Subscribe</h5>
        <div className="flex w-full max-w-xs items-center space-x-2">
          <Input
            type="email"
            placeholder="Email Address"
            className="px-4 h-[3rem] ml-4 text-xl lg:w-[18rem] w-[12rem] placeholder:text-xs lg:placeholder:xl"
          />
          <Button
            type="submit"
            className="relative right-[3.4rem] h-[3rem] w-[3rem] bg-green-500 hover:bg-green-600"
          >
            <FaArrowRight />
          </Button>
        </div>
        <p className="font-inter text-xs  text-[#3F3D3D]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, temtempor incididunt ut labore.
        </p>
      </div>
      {listItem.map((item, index) => (
        <div key={index} className="text-center md:text-left">
          <h4 className="font-semibold">{item.title}</h4>
          <ul>
            {item.list.map((item, index) => (
              <li key={index} className="pt-3 w-[8rem]  mx-auto  md:text-left">
                <Link href="/" className="my-3 text-base text-[#14131399]">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Newsletter;
