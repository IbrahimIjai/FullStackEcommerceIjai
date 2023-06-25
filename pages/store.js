/** @format */

import { Menu } from "@headlessui/react";
// import div from "../components/div";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import axios from "axios";

import { Store } from "../utils/Store";
import db from "../utils/db";
import Product from "../models/Product";
import { toast } from "react-toastify";

function Storee({ products }) {
	const [activeBtn, setActiveBtn] = useState("All");
	const [displayItems, setDisplayItems] = useState(products);
	console.log(displayItems);
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const addToCartHandler = async (product) => {
		const existItem = cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error("Sorry. Product is out of stock");
		}
		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

		toast.success("Product added to the cart");
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

	const filterProducts = (brand, category, name) => {
		console.log("yooo");
		setActiveBtn(name);
		console.log(name);
		const sortedProduct = products.filter(
			(displayItems) =>
				displayItems.brand === brand && displayItems.category === category,
		);
		console.log(sortedProduct);
		setDisplayItems(sortedProduct);
	};

	return (
		<Layout title="Store - Dapperfolio">
			<div
				ref={divRef}
				className="bg-white py-8 px-[3%] z-40 w-screen items-start flex justify-center flex-col">
				<h1 className="text-3xl font-bold">Store</h1>
				<div className="flex items-center">
					<div
						onClick={() => {
							setDisplayItems(products);
							setActiveBtn("All");
						}}
						className={`sortBtn hover:bg-slate-200 ${
							activeBtn == "All" && "bg-black text-white"
						}`}>
						<p>All</p>
					</div>
					<Menu
						as="div"
						className={`sortBtn ${
							activeBtn == "Apple" && "bg-primary hover:bg-primary text-white"
						} relative inline-block`}>
						<Menu.Button className={`flex items-center `}>
							Apple <IoChevronDownSharp />{" "}
						</Menu.Button>
						<Menu.Items className="absolute z-40 right-0 origin-top-right mt-2 bg-white text-primary  shadow-lg ">
							<Menu.Item
								onClick={() => filterProducts("Apple", "Iphone", "Apple")}>
								<div className="dropdown-link">Iphones</div>
							</Menu.Item>
							<Menu.Item
								onClick={() => filterProducts("Apple", "Mac", "Apple")}>
								<div className="dropdown-link">Mac</div>
							</Menu.Item>

							<Menu.Item
								onClick={() => filterProducts("Apple", "Vision Pro", "Apple")}>
								<div className="dropdown-link">Vision Pro</div>
							</Menu.Item>
							<Menu.Item
								onClick={() => filterProducts("Apple", "Gears", "Apple")}>
								<div className="dropdown-link">Airpod</div>
							</Menu.Item>
						</Menu.Items>
					</Menu>
					<button
						className={`sortBtn hover:bg-slate-200 ${
							activeBtn == "Tecno" && "bg-primary hover:bg-primary text-white"
						}`}
						onClick={() => filterProducts("Tecno", "Andriod", "Tecno")}>
						<p>Tecno</p>
					</button>
					<button
						className={`sortBtn hover:bg-slate-200 ${
							activeBtn == "Watch" && "bg-primary hover:bg-primary text-white"
						}`}
						onClick={() => filterProducts("Tecno", "Andriod", "Watch")}>
						<p>Watch</p>
					</button>
				</div>
			</div>

			<div>
				{displayItems == null || displayItems.length == 0 ? (
					<div className="min-h-300px w-full font-bold text-gray-800 flex items-center justify-center"> <p>No item found under that specification</p> </div>
				) : (
					<div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mx-auto">
						{displayItems.map((product) => (
							<ProductItem
								product={product}
								key={product.slug}
								addToCartHandler={addToCartHandler}></ProductItem>
						))}
					</div>
				)}
			</div>
		</Layout>
	);
}

export default Storee;
export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	const featuredProducts = await Product.find({ isFeatured: true }).lean();
	return {
		props: {
			featuredProducts: featuredProducts.map(db.convertDocToObj),
			products: products.map(db.convertDocToObj),
		},
	};
}
