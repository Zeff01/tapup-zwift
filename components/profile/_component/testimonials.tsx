import Image from "next/image";
import { FaStar } from "react-icons/fa";
const testimonialList = [
  {
    image: "/assets/testimonialImg.png",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elitempor incididunt ut labore et dolore magna aliqua voluptate velit esse cillum dolore eu fugiat nulla pariatur ccaecat cupidatat non proident",
  },
  {
    image: "/assets/testimonialImg2.png",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elitempor incididunt ut labore et dolore magna aliqua voluptate velit esse cillum dolore eu fugiat nulla pariatur ccaecat cupidatat non proident",
  },
  {
    image: "/assets/testimonialImg3.png",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elitempor incididunt ut labore et dolore magna aliqua voluptate velit esse cillum dolore eu fugiat nulla pariatur ccaecat cupidatat non proident",
  },
];
const Testimonials = () => {
  return (
    <section className="container py-4 shadow-xl">
      <h2 className="text-xl md:text-2xl">Testimonials</h2>
      <ul className="pt-4">
        {testimonialList.map((item, index) => (
          <li key={index} className="flex w-full gap-4 py-3 pl-4">
            <div className="relative w-[3.5rem] rounded-full h-[3.5rem] md:w-[6rem] md:h-[6rem] ">
              <Image
                src={item.image}
                alt={`image ${index}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-2 w-[70vw]">
              <div className="flex">
                {[1, 1, 1, 1, 1].map((_, index) => (
                  <div className="" key={index}>
                    <FaStar className="fill-yellow-300" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] text-justify md:text-base">
                  {item.comment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
