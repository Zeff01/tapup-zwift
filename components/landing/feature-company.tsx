import { companyListItem } from "@/constants";
import Image from "next/image";

const CompanyList = () => {
  return (
    <ul className="flex items-center justify-evenly p-2 md:p-5 bg-gradient-to-r from-[#f7f6f6] to-[#a0ffbd]">
      {companyListItem.map((item, index) => (
        <li
          key={index}
          className="relative w-[7rem] h-[4rem] lg:h-[12rem] lg:w-[12rem]"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={175}
            height={100}
            priority
            className="object-contain w-full h-full"
          />
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;
