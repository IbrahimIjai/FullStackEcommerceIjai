import { FaAssistiveListeningSystems } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import useMediaQuery from "../../hooks/useMediaQueryhooks";
export default function Footer() {
	const isDesktop = useMediaQuery("(min-width: 850px)");
	return (
		<footer className="bg-primary rounded-t-2xl w-screen px-[10%] text-gray-100 first-letter:
        flex items-center justify-center gap-7 text-center flex-col">
			<Link href="/">
				<a className="text-lg flex gap-1 lg:gap-2 items-center font-bold">
					<FaAssistiveListeningSystems size={isDesktop ? 35 : 25} />
					<span>DapperFolio</span>
				</a>
			</Link>

			<p>
				Selling premium products, designed to elevate your everyday experience,
				Tested and verified, comments from users
			</p>

			<p>Copyright © 2023 DevIbrahimIjai</p>
		</footer>
	);
}
