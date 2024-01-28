"use client";
import Link from "next/link";
import React from "react";
import { PiArrowLeftThin, PiCodeThin } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import dayjs from "dayjs";

function Homepage(data) {
  const dataResult = data?.data;
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="w-full lg:w-fit "
    >
      <div className="  bg-[#1C1C1C] lg:bg-transparent rounded-2xl ">
        <div className="">
          {dataResult?.articles
            ?.filter(
              (el, index, self) =>
                index === self.findIndex((t) => t.title === el.title)
            )
            ?.map((item, index) => (
              <div
                key={index}
                className="  bg-[#1C1C1C] rounded-lg text-neutral-400"
              >
                <Link href={item?.url} target="_blank">
                  <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
                    <div className="flex items-start gap-x-3">
                      <Image
                        width={1000}
                        height={1000}
                        className="!w-24 h-24 object-cover rounded-md"
                        src={item?.urlToImage || "/pic.jpg"}
                        alt=""
                      />
                      <div className="flex-1">
                        <h1 className="text-sm font-RubikMedium text-neutral-300 line-clamp-2">
                          {item?.title}
                        </h1>
                        <p className="text-sm line-clamp-2">
                          {item?.description}
                        </p>
                        <div className="flex gap-2">
                          <span className="text-sm">
                            {dayjs(item?.publishedAt).format("DD/MM/YYYY")}{" "}
                          </span>
                          <span className=" bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold shrink-0 ">
                            {item?.source?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          <div className="mt-6  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center gap-x-3">
                <div>
                  <h2 className="text-sm font-RubikMedium">
                    Smooth Animation with React and Framer Motion
                  </h2>
                  <div className="flex items-center gap-x-2 font-RubikBold">
                    <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] ">
                      TypeScript
                    </p>
                    <div className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span className="text-xs">Sunday, July 22, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Homepage;
