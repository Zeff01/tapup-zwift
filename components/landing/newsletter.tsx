import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

// remove product list and information  temporarily
const listItem = [
  // {
  //   title: "Product",
  //   list: ["Black Card", "Yellow Card", "Blue Card"],
  // },
  // {
  //   title: "Information",
  //   list: ["News", "Testimonials", "Feedback"],
  // },
  {
    title: "Company",
    list: ["Privacy", "Terms and Conditions"],
    url: ["/privacy-policy", "/terms-conditions"],
    // list: ["Customer Service", "Terms of Use", "Privacy", "About"],
  },
];

const Newsletter = () => {
  return (
    <section className="flex flex-col md:flex-row justify-evenly gap-8 px-8 items-center md:items-start">
      <div className="w-full max-w-xl p-6 flex gap-4 flex-col border-gray-200 rounded-md border-2">
        <h5 className="font-semibold text-xl">Subscribe</h5>
        <div className="flex w-full items-center space-x-2 relative">
          <Input
            type="email"
            placeholder="Email Address"
            className="pl-4 pr-16 h-[3rem] text-xl w-full placeholder:text-xs lg:placeholder:xl"
            disabled
          />
          <Button
            type="submit"
            className="absolute z-20 right-0 h-[3rem] w-[3rem] bg-green-600 hover:bg-green-700"
          >
            <FaArrowRight />
          </Button>
        </div>
        <p className="font-inter text-sm text-grayDescription">
          Stay updated with the latest news, updates, and exclusive offers.
          Subscribe to our newsletter today!
        </p>
      </div>
      <div className="flex gap-8 flex-col sm:flex-row">
        {listItem.map((item, index) => (
          <div key={index} className="text-center md:text-left pt-4 sm:pt-0">
            <h4 className="font-bold text-lg">{item.title}</h4>
            <ul>
              {item.list.map((listItem, index) => (
                <li key={index} className="pt-3 w-[8rem] mx-auto  md:text-left">
                  <Link href={item.url[index]} className="my-3 text-base">
                    {listItem}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Newsletter;
