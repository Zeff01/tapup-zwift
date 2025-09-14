import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center min-h-screen p-4 md:p-8 lg:p-16 d">
      {/* Main Content Container */}
      <div className="container">
        <div className="pl-0 md:pl-8 lg:pl-16">
          {/* Title */}
          <h1 className="text-[40px] md:text-[60px] lg:text-[96px] text-[#1FAE3A] font-medium italic leading-[1.5] mb-4">
            Oops,
          </h1>

          {/* Description */}
          <p className="text-[20px] md:text-[28px] lg:text-[36px] text-foreground font-bold leading-[1.5] max-w-[700px]">
            Unfortunately, the page you are looking for does not exist.
          </p>

          {/* Button */}
          <Link
            href="/cards"
            className="inline-block mt-8 bg-[#22A348] hover:bg-[#1B8A3A] text-white px-6 py-2.5 rounded-md transition-colors duration-200"
          >
            Back To Main
          </Link>
        </div>
      </div>
    </div>
  );
}
