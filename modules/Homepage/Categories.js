/** @format */

import Img1 from "../../public/images/heros1.png";
import Img2 from "../../public/images/Heros2.png";
import Img3 from "../../public/images/Heros3.png";
import Img4 from "../../public/images/Heros4.png";
import { AiOutlineArrowRight } from "react-icons/ai";

import React from "react";
import Image from "next/image";
import useMediaQuery from "../../hooks/useMediaQueryhooks";
import Link from "next/link";

function Category() {
	const isDesktop = useMediaQuery("(min-width: 850px)");

	return (
		<div className="my-12 mx-[7%]">
			<div className="grid lg:grid-cols-2 gap-8">
				{items.map((item, i) => {
					return (
						<div
							className="mx-auto p-12 w-full rounded-xl overflow-hidden bg-gray-100"
							key={i}>
							<div className="flex justify-end">
								<Image
									className=""
									src={item.img}
									alt=""
									width={isDesktop ? 160 : 100}
									height={isDesktop ? 160 : 100}
									objectFit="contain"
								/>
							</div>
							<h1 className="text-2xl my-6 font-semibold">{item.name}</h1>
							<p>{item.desc}</p>
							<Link href="/store">
								<a className="mt-6 border-b-1 flex items-center gap-6 p-2 hover:border-primary shadow-md">
									Explore category <AiOutlineArrowRight />
								</a>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Category;

const items = [
	{
		name: "Technology",
		desc: "Explore the Latest Innovations and Unleash the Power of Technology",
		img: Img1,
	},
	{
		name: "Gear",
		desc: "Equip Yourself with Top-Notch Gear for Every Adventure",
		img: Img2,
	},
	{
		name: "Accesories",
		desc: "Explore the Latest Innovations and Unleash the Power of Technology",
		img: Img4,
	},
	{
		name: "Gadgets",
		desc: "Find the Perfect Finishing Touch with Stylish and Functional Accessories",
		img: Img3,
	},
];
