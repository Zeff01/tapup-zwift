import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ComingSoon = () => {
  return (
    <div className="w-full min-h-full overflow-y-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="font-extrabold md:text-6xl lg:text-8xl text-center text-4xl uppercase text-[#1FAE3A]">
          Coming Soon
        </h1>
        <p className="font-bold mt-6 text-center lg:text-4xl text-xl">
          We are still working on it.
        </p>

        <div className="w-full flex justify-center mt-9">
          <div className="w-[90%] relative  rounded-full h-12 lg:h-16">
            <input
              className="bg-green-600 w-full lg:text-3xl rounded-full h-full placeholder:text-white lg:placeholder:text-4xl placeholder:text-xs md:placeholder:text-xl placeholder:italic text-white lg:px-10 lg:py-8 text-sm px-4 py-6"
              placeholder="Your Email and Get Notified"
              type="email"
            />
            <button
              type="button"
              className="absolute right-2 top-2 md:right-3 md:top-2 px-3 py-1 border-none text-black hover:bg-green-400 text-2xl lg:text-4xl bg-white lg:px-4 md:px-4 rounded-full"
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
