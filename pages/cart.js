/** @format */

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

function CartScreen() {
	const { status, data: session } = useSession();
	console.log("this is the status", typeof status);
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const removeItemHandler = (item) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};
	const updateCartHandler = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			return toast.error("Sorry. Product is out of stock");
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
		toast.success("Product updated in the cart");
	};

	const divRef = useRef(null);
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		let sticky = divRef.current.offsetTop - 83;
		console.log(divRef);
		if (window.pageYOffset >= sticky) {
			divRef.current.classList.add("stickyDiv");
		} else {
			divRef.current.classList.remove("stickyDiv");
		}
	};

	const handleCheckout = () => {
		if (status == "unauthenticated") {
			router.push("/login");
		} else {
			router.push("/shipping");
		}
	};

	return (
		<Layout title="Shopping Cart">
			<div className="px-[5%]">
				<h1
					ref={divRef}
					className="w-full py-8 px-6 bg-white font-bold mb-4 text-2xl">
					Shopping Cart
				</h1>
				{cartItems.length === 0 ? (
					<div className="min-h-[40vh] flex items-center justify-center">
						<div>
							{" "}
							Oopps!!! your Cart is empty.{" "}
							<Link href="/store">
								<a className="text-blue-600 font-bold p-1 rounded-xl border border-primary">
									{" "}
									Go to the store
								</a>
							</Link>{" "}
						</div>
					</div>
				) : (
					<div className="grid md:grid-cols-7 md:gap-7">
						<div className="overflow-x-auto md:col-span-4">
							<table className="min-w-full ">
								<thead className="border-b">
									<tr>
										<th className="p-5 text-left">Item</th>
										<th className="p-5 text-right">Quantity</th>
										<th className="p-5 text-right">Price</th>
										<th className="p-5">Action</th>
									</tr>
								</thead>
								<tbody>
									{cartItems.map((item) => (
										<tr key={item.slug} className="border-b">
											<td>
												<Link href={`/product/${item.slug}`}>
													<a className="flex items-center">
														<Image
															src={item.image}
															alt={item.name}
															width={50}
															height={50}></Image>
														&nbsp;
														{item.name}
													</a>
												</Link>
											</td>
											<td className="p-5 text-right">
												<select
													value={item.quantity}
													onChange={(e) =>
														updateCartHandler(item, e.target.value)
													}>
													{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</td>
											<td className="p-5 text-right">${item.price}</td>
											<td className="p-5 text-center">
												<button onClick={() => removeItemHandler(item)}>
													<XCircleIcon className="h-5 w-5"></XCircleIcon>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className=" md:col-span-3 card p-5">
							<ul>
								<li>
									<div className="pb-3 text-xl">
										Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :
										${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</div>
								</li>
								<li>
									<button
										onClick={handleCheckout}
										className="primary-button w-full">
										Check Out
									</button>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
