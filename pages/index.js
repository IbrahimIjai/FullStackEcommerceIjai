/** @format */

import axios from "axios";
import { useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

import HomePge from "../modules/Homepage";

export default function Home({ featuredProducts, products }) {
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

	return (
		<Layout title="Market HomePge">
			<HomePge />
			<div className="mt-[10vh] mx-auto  w-[90%]">
				<div>
					{products.length > 0 && (
						<div>
							<h2 className="h2 font-Semi text-2xl my-12">Latest Products</h2>
							<div className="grid gap-5 md:grid-cols-3">
								{products.map((product) => (
									<ProductItem
										product={product}
										key={product.slug}
										addToCartHandler={addToCartHandler}></ProductItem>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="my-[8vh] p-8 bg-gray-100 rounded-2xl shadow-md flex flex-col items-start gap-6 mx-9">
				<h1 className="text-2xl font-semibold">Premium Design and Quality</h1>
				<p className="text-gray-700">
					Born out of a shared love of good design & quality products, we create
					considered solutions fit for the modern lifestyle. Always driven by
					passion, we work to empower others to live the same way.
				</p>

				<Link href="/store">
					<a className="primary-button">Explore</a>
				</Link>
			</div>
		</Layout>
	);
}

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
