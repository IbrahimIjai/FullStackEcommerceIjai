/** @format */

import DropdownLink from "../DropdownLink";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import Cookies from "js-cookie";
import { Menu } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import useMediaQuery from "../../hooks/useMediaQueryhooks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Avatar from "@radix-ui/react-avatar";
import testImg from "../../public/images/shirt1.jpg";

export default function Navbar() {
	const isDesktop = useMediaQuery("(min-width: 850px)");
	const { status, data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove("cart");
		dispatch({ type: "CART_RESET" });
		signOut({ callbackUrl: "/login" });
	};

	const router = useRouter();
	const [query, setQuery] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
		router.push(`/search?query=${query}`);
	};
	return (
		<header className="bg-gray-100 z-50 text-primary fixed top-0 right-0 left-0   w-screen h-[80px] flex items-center justify-center">
			<nav className="flex  h-12 items-center px-8 justify-between w-[100%]">
				<Link href="/">
					<a className="text-lg flex gap-1 lg:gap-2 items-center text-primary  font-bold">
						<FaAssistiveListeningSystems size={isDesktop ? 35 : 25} />
						<spam>DapperFolio</spam>
					</a>
				</Link>
				<form
					onSubmit={submitHandler}
					className="mx-auto  hidden w-[35vw] rounded-2xl  justify-center md:flex">
					<input
						onChange={(e) => setQuery(e.target.value)}
						type="text"
						className="bg-gray-100 p-2 w-full focus:p-3 transition-all duration-500  rounded-2xl  rounded-tr-none rounded-br-none text-sm border border-gray-400 focus:ring-0"
						placeholder="Search products"
					/>
					<button
						className=" rounded-2xl  rounded-tl-none rounded-bl-none border border-gray-400  p-1 text-sm"
						type="submit"
						id="button-addon2">
						<SearchIcon className="h-5 w-5"></SearchIcon>
					</button>
				</form>

				<div className="flex items-center justify-center gap-4 md:space-x-4 ">
					{isDesktop && (
						<Link href="/store">
							<a className="font-bold text-primary hover:scale-105 transition-all duration-700">
								Store
							</a>
						</Link>
					)}

					<div>
						<Link href="/cart">
							<a className="text-primary p-2 flex items-center justify-center relative space-x-3">
								<AiOutlineShoppingCart
									className="hover:scale-105 transition-all duration-700"
									size={32}
								/>
								{cartItemsCount > 0 && (
									<span className="ml-1 absolute top-0 right-0 rounded-full bg-orange-300 px-2 py-1 text-xs font-bold">
										{cartItemsCount}
									</span>
								)}
							</a>
						</Link>
					</div>

					{status === "loading" ? (
						"Loading"
					) : session?.user ? (
						<Menu as="div" className="relative inline-block">
							<Menu.Button className="text-blue-600 dark:text-blue-100">
								{/* {session.user.name} */}
								<Avatar.Root className="AvatarRoot">
									<Avatar.Image
										className="AvatarImage"
										src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										alt="Colm Tuite"
									/>
									<Avatar.Fallback className="AvatarFallback" delayMs={600}>
										CT
									</Avatar.Fallback>
								</Avatar.Root>
							</Menu.Button>
							<Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
								<Menu.Item>
									<DropdownLink className="dropdown-link" href="/profile">
										Update Profile
									</DropdownLink>
								</Menu.Item>
								<Menu.Item>
									<DropdownLink className="dropdown-link" href="/order-history">
										Order History
									</DropdownLink>
								</Menu.Item>
								{session.user.isAdmin && (
									<Menu.Item>
										<DropdownLink
											className="dropdown-link"
											href="/admin/dashboard">
											Admin Dashboard
										</DropdownLink>
									</Menu.Item>
								)}
								{!isDesktop && (
									<Menu.Item>
										<DropdownLink
											className="dropdown-link"
											href="/store">
											Store
										</DropdownLink>
									</Menu.Item>
								)}
								<Menu.Item>
									<DropdownLink
										className="dropdown-link"
										href="#"
										onClick={logoutClickHandler}>
										Logout
									</DropdownLink>
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<Link href="/login">
							<button className="primary-button">Sign in</button>
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
