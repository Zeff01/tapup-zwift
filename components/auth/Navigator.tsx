import Image from "next/image";
import logo from "@/public/images/logo.png";

interface NavigatorType {
  buttonLabel: string;
  msg: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  start: boolean;
}

export default function Navigator({
  buttonLabel,
  msg,
  setToggle,
  start,
}: NavigatorType) {
  return (
    <div
      className={`flex flex-col gap-y-2 flex-1 items-center ${
        start ? "justify-start pt-5 " : "justify-end pt-0 pb-4"
      } md:justify-center  md:pt-0`}
    >
      <Image
        src={logo}
        alt="logo"
        height={125}
        width={125}
        className={`absolute md:static left-2 ${
          start ? "top-2" : " bottom-[62px]"
        }`}
      />
      <div className="text-center hidden md:flex flex-col gap-y-2 ">
        <h1 className=" text-2xl mb-2">
          Eliminate Financial worries with
          <span className="block">Tap Up's assistance.</span>
        </h1>
        <p className="text-sm font-mono">
          Manage your finances effortlessly and swiftly with Tap Up.
        </p>
      </div>
      <div className="w-full px-10 pt-6 flex flex-col items-center md:items-start gap-y-2">
        <p className="text-xs text-black pl-5">{msg}</p>
        <button
          className="border-2 text-center py-1 text-lg border-white w-1/2 md:w-full rounded-md hover:bg-[#e2ffed40] bg-[#e2ffed64] transform transition-colors duration-300 "
          type="button"
          onClick={() => setToggle((prev: Boolean) => !prev)}
        >
          {buttonLabel}
        </button>
        <div className="hidden md:flex gap-x-1 ">
          <hr className="w-1 border-t-4 rounded-full border-white  my-3" />
          <hr className="w-1 border-t-4 rounded-full border-white my-3" />
          <hr className="w-14 border-t-4 rounded-full border-white my-3" />
        </div>
      </div>
    </div>
  );
}
