/** @format */

import React from "react";
import Img1 from "../../public/images/Heros1.png";
import Img2 from "../../public/images/Heros2.png";
import Img3 from "../../public/images/Heros3.png";
import Img4 from "../../public/images/Heros4.png";

import Image from "next/image";
import useMediaQuery from "../../hooks/useMediaQueryhooks";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Heros() {
	const isDesktop = useMediaQuery("(min-width: 850px)");
	const {scrollY} = useScroll();
	let y = useTransform(scrollY, [0, 250], ["0%", "50%"])

	return (
		<div className="flex items-center justify-center bg-gray-100 relative h-[95vh] w-full">
			<motion.div style={{y}} className="px-8 flex flex-col items-center lg:w-[70%] gap-5">
				<h1 className="text-[1.7rem] lg:text-[2.7rem] text-center font-medium">
					High-quality tech gadgets & accessories
				</h1>
				<p className="text-gray-500 text-center">
					Shop our curated selection of premium products, designed to
					elevisDesktop ? 160 : 100 your everyday experiences
				</p>
				<div className="flex items-center gap-3">
					<Link href="/store">
						<a className="bg-primary text-white p-2 px-3 rounded-2xl">
							Browse products
						</a>
					</Link>
					<button className="bg-gray-100 text-primary p-2 px-3  rounded-2xl border border-primary">
						About Us
					</button>
				</div>
			</motion.div>

			<div className="absolute top-2 p-8 -left-[70px] lg:left-0">
				<div className="relative overflow-hidden py-8">
					<div className="absolute inset-0 rounded-xl  z-40 backdrop-blur-sm " />
					<Image
						className=""
						src={Img1}
						alt=""
						width={isDesktop ? 160 : 100}
						height={isDesktop ? 160 : 100}
						objectFit="contain"
					/>
				</div>
			</div>
			<div className="absolute bottom-8 left-8">
				<div className="relative overflow-hidden py-8 px-3">
					<div className="absolute inset-0 rounded-xl bg-[rgba(163,171,173,0.2)] backdrop-blur-lg" />
					<Image
						src={Img2}
						alt=""
						width={isDesktop ? 160 : 100}
						height={isDesktop ? 160 : 100}
						objectFit="contain"
					/>
				</div>
			</div>
			<div className="absolute top-0 right-12">
				<div className="relative overflow-hidden py-8 px-3">
					<div className="absolute inset-0 rounded-xl bg-[rgba(163,171,173,0.2)] backdrop-blur-lg" />
					<Image
						src={Img3}
						alt=""
						width={isDesktop ? 160 : 100}
						height={isDesktop ? 160 : 100}
						objectFit="contain"
					/>
				</div>
			</div>
			<div className="absolute bottom-8 right-3">
				<Image
					src={Img4}
					alt=""
					width={isDesktop ? 160 : 100}
					height={isDesktop ? 160 : 100}
					objectFit="contain"
				/>
			</div>
		</div>
	);
}
