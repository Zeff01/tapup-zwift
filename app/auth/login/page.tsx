"use client";

import { useState } from "react";

export default function AuthPage() {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-5">
      <div className="w-[1200px]  min-h-[700px] flex md:items-center relative">
        <div className="w-full  md:h-[400px]  flex flex-col md:flex-row bg-red-200 ">
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="flex flex-1 items-start md:items-center justify-center"
          >
            left
          </button>
          <button
            onClick={() => setToggle((prev) => !prev)}
            className="flex flex-1 items-end md:items-center justify-center"
          >
            right
          </button>
        </div>
        <div
          className={`absolute  bg-green-100 w-full md:w-1/2 h-3/4 md:h-[650px] text-black flex items-center justify-center overflow-hidden transfrom ${
            toggle
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-[33%] md:translate-y-0 md:translate-x-full"
          }  transition-transform duration-500 ease-in-out`}
        >
          <div
            style={{
              transform: toggle ? "translateX(0)" : "translateX(-100%)",
            }}
            className={`bg-gray-400  w-full absolute transition-transform duration-500 ease-in-out`}
          >
            <button>Content 1</button>
          </div>
          <div
            style={{
              transform: toggle ? "translateX(100%)" : "translateX(0)",
            }}
            className={`bg-pink-300 w-full  transition-transform duration-500 ease-in-out`}
          >
            <button>Content 2</button>
          </div>
        </div>
      </div>
    </div>
  );
}
