import Image from "next/image";
import React from "react";
import { FaScrewdriverWrench } from "react-icons/fa6";
import grids from "../../public/images/grid.png";

const Products = () => {
  return (
    <section
      className="py-8 lg:py-16  container items-center flex xl:flex-row flex-col"
      id="products"
    >
      <div className="">
        <div className="flex items-start flex-col md:flex-row">
          <div className="md:w-[200px] mr-5 pb-4">
            <p className="md:text-2xl text-base text-muted-foreground">
              Create your card
            </p>
            <h2 className="md:text-5xl text-2xl font-bold">
              With our <span className="text-green-500">templates</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Image
              src="/assets/cards/back/card7.png"
              alt="card"
              width={250}
              height={200}
              className=""
            />
            <Image
              src="/assets/cards/back/card6.png"
              alt="card"
              width={250}
              height={150}
              className=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 flex-col gap-3 md:flex-row">
          <Image
            src="/assets/cards/back/card1.png"
            alt="card"
            width={250}
            height={200}
            className=""
          />
          <Image
            src="/assets/cards/back/card4.png"
            alt="card"
            width={250}
            height={250}
            className=""
          />
        </div>
        <div className="flex items-center justify-center w-full mt-4">
          <Image
            src="/assets/cards/back/card5.png"
            alt="card"
            width={250}
            height={200}
            className=""
          />
        </div>
      </div>

      <div className=" flex justify-center md:justify-start items-start flex-1">
        <div className=" flex flex-col md:justify-end justify-center gap-y-2 min-h-[400px]">
          <div className="flex items-end md:h-[300px]">
            <p className=" md:text-2xl w-[150px] text-base text-muted-foreground md:mr-2">
              or build your own
            </p>
            <div className="relative">
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white  border  md:dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] shadow-[0_0_30px_30px_rgba(255,255,255,1)] dark:bg-black text-primary rounded-md">
                <FaScrewdriverWrench className="text-xl text-slate-400" />
              </button>
              <Image
                className="md:h-[12rem] h-[7rem]"
                src={grids}
                alt="grids"
                height={350}
                width={400}
              />
            </div>
          </div>
          <h2 className="md:text-4xl lg:text-5xl font-bold text-2xl">
            Using our
          </h2>
          <h2 className="md:text-4xl lg:text-5xl text-green-500 font-bold text-2xl">
            card builder
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Products;
