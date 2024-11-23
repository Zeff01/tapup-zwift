import Link from "next/link";
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

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-block bg-[#22A348] hover:bg-[#1B8A3A] text-white px-6 py-2.5 rounded-md transition-colors duration-200"
          >
            Back To Main
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
