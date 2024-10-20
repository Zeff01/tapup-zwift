"use client";

import { Divider } from "@/components/auth/Divider";
import Navigator from "@/components/auth/Navigator";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Social } from "@/components/auth/Social";
import { useState } from "react";

export default function AuthPage() {
  const [toggle, setToggle] = useState(true);
  return (
    <main className="w-full  min-h-screen flex items-center justify-center  md:px-5 py-5 md:py-0">
      <div className="w-[1200px]  min-h-[700px] flex md:items-center relative">
        <div className="w-full  md:h-[400px]  flex flex-col md:flex-row bg-gradient-to-bl from-[#21C15C]  bg-[#419a50] rounded-lg">
          <Navigator
            start={true}
            setToggle={setToggle}
            buttonLabel={"Register Now"}
            msg="Don't have an account?"
          />
          <Navigator
            start={false}
            setToggle={setToggle}
            buttonLabel={"Sign In"}
            msg="Already have an account?"
          />
        </div>
        <div
          className={`absolute rounded-md bg-white w-full md:w-1/2 h-5/6 md:h-[650px] text-black flex items-center justify-center overflow-hidden transfrom ${
            toggle
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-[21%] md:translate-y-0 md:translate-x-full"
          }  transition-transform duration-500 ease-in-out`}
        >
          <div
            style={{
              transform: toggle ? "translateX(0)" : "translateX(-100%)",
            }}
            className={`px-10 md:px-20 w-full absolute transition-transform duration-500 ease-in-out`}
          >
            <RegisterForm />
            <Divider />
            <Social />
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
    </main>
  );
}
