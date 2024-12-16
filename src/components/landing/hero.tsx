"use client";

import { motion } from "framer-motion";
import React from "react";
import { Highlight } from "../ui/hero-highlight";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
    return (
        // <AuroraBackground>
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll titleComponent={<>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4 mb-32"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        Read, Write and Share Stories
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        Discover, learn, and experience <Highlight>
                            stories on any topic
                        </Highlight>
                    </div>
                    <Link href={"/explore"} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                        Explore now
                    </Link>
                </motion.div></>}>
                <Image
                    src={`/hero.png`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
        // </AuroraBackground>
    );
}
