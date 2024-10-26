import company1 from "@/public/assets/company1.png";
import company2 from "@/public/assets/company2.png";
import company3 from "@/public/assets/company3.png";
import company4 from "@/public/assets/company4.png";
import company5 from "@/public/assets/company5.png";

import Image from "next/image";

const companyListItem = [company1, company2, company3, company4, company5];

const CompanyList = () => {
  return (
    <ul className="flex items-center justify-evenly w-[100%] p-2 md:p-5 bg-gradient-to-r from-[#F7F6F633] to-[#1FAE3A33] lg:h-[30vh]">
      {companyListItem.map((item, index) => (
        <li key={index} className="relative w-[5rem] h-[5rem] lg:h-[12rem] lg:w-[12rem]">
          <Image src={item} alt={`Company ${index + 1}`} fill className="object-contain" />
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;
