import Image from 'next/image'
import React from 'react'
import { FaScrewdriverWrench } from 'react-icons/fa6';
import grids from '../../public/images/grid.png';
import templateImg from '../../public/images/templates-container.png';

const UserWebsite = () => {
  return (
      <section className='flex py-8 md:py-24 mx-auto flex-col xl:flex-row' id='userswebsite'>
          <div className='flex'>
             <div className="md:w-[220px] pb-4 pl-10 w-full lg:pl-2">
            <p className="md:text-2xl text-sm text-muted-foreground">
              Create your card
            </p>
            <h2 className="md:text-4xl lg:text-5xl text-2xl font-bold">
              With our <span className="text-green-500">templates</span>
            </h2>
              </div>
              <div className='relative xl:right-20 md:right-16'>
                  
              <Image src={templateImg } alt='templateImage' width={500} height={500} className='object-cover' />
              </div>
          </div>


         <div className=" flex items-center justify-center pt-16 flex-1">
        <div className=" flex flex-col justify-center gap-y-2 min-h-[400px]">
          <div className="flex items-end ">
            <p className=" md:text-2xl w-[150px] text-base text-muted-foreground md:mr-2">
              or build your own
            </p>
            <div className="relative">
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-white  border  md:dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] dark:shadow-[0_0_30px_30px_rgba(0,0,0,.8)] shadow-[0_0_30px_30px_rgba(255,255,255,1)] dark:bg-black text-primary rounded-md">
                <FaScrewdriverWrench className="text-xl text-slate-400" />
              </button>
              <Image
                className="md:h-[22rem] h-[16rem] w-[120px] md:w-[200px]"
                src={grids}
                alt="grids"
                height={500}
                width={200}
              />
            </div>
          </div>
          <h2 className="md:text-4xl lg:text-5xl font-bold text-2xl">Using our</h2>
          <h2 className="md:text-4xl lg:text-5xl text-green-500 font-bold text-2xl">
            card builder
          </h2>
              </div>
              </div>
      </section>
  )
}

export default UserWebsite