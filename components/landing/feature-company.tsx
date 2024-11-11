import Image from "next/image";

const companyListItem = [
  {
    title: "Bradwell",
    image: "/assets/company1.png",
  },
  {
    title: "InnovatEd",
    image: "/assets/company2.png",
  },
  {
    title: "Phil Airlines",
    image: "/assets/company3.png",
  },
  {
    title: "Company logo",
    image: "/assets/company4.png",
  },
  {
    title: "Highland Bali",
    image: "/assets/company5.png",
  },
];

const CompanyList = () => {
  return (
    <ul className="flex items-center justify-evenly w-[100%] p-2 md:p-5 bg-gradient-to-r from-[#f7f6f6] to-[#56ff75c1]">
      {companyListItem.map((item, index) => (
        <li
          key={index}
          className="relative w-[7rem] h-[4rem] lg:h-[12rem] lg:w-[12rem]"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;
