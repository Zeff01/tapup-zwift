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
    <section className="mx-auto py-4 shadow-xl text-black">
      <h2 className="text-xl md:text-2xl pl-4">Testimonials</h2>
      <ul className="pt-4">
        {testimonialList.map((item, index) => (
          <li
            key={index}
            className="flex w-full items-center justify-between py-3"
          >
            <div className="relative w-[30%]  h-[4rem]">
              <Image
                unoptimized={true}
                src={item.image}
                alt={`image ${index}`}
                fill
                className="object-contain rounded-full"
              />
            </div>

            <div className="flex flex-col gap-2 w-[70%] pr-4">
              <div className="flex">
                {[1, 1, 1, 1, 1].map((_, index) => (
                  <div className="" key={index}>
                    <FaStar className="fill-yellow-300" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-justify">{item.comment}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Testimonials;
