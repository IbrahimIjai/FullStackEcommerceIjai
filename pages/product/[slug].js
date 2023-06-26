/** @format */

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

export default function ProductScreen(props) {
	const { product } = props;
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	if (!product) {
		return <Layout title="Produt Not Found">Produt Not Found</Layout>;
	}

	const addToCartHandler = async () => {
		const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error("Sorry. Product is out of stock");
		}

		dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
		router.push("/cart");
	};

	return (
		<Layout title={product.name}>
			<div className="px-[5%] py-[5vh]">
				<div className="grid md:grid-cols-7 gap-5 md:gap-9">
					<div className="md:col-span-3 rounded-3xl overflow-hidden">
						<Image
							src={product.image}
							alt={product.name}
							width={540}
							height={400}
							layout="responsive"></Image>
					</div>
					{/* <div className="flex flex-col items-center "> */}
					<div className="md:col-span-2 mx-auto">
						<ul>
							<li>
								<h1 className="text-[1.5rem] font-semibold ">
									{product.name} || <span>{product.brand}</span>
								</h1>
							</li>
							<li>Category: {product.category}</li>
							<li>Description: {product.description}</li>
						</ul>
					</div>
					<div className="md:col-span-2 mx-auto">
						<div className="card p-5">
							<div className="mb-2 flex justify-between">
								<div className="font-semibold">Price</div>
								<div>${product.price}</div>
							</div>
							<div className="mb-2 flex justify-between">
								<div className="font-semibold">Status</div>
								<div>
									{product.countInStock > 0 ? "In stock" : "Out of Stock"}
								</div>
							</div>
							<button
								className="primary-button w-full"
								onClick={addToCartHandler}>
								Add to cart
							</button>
						</div>
						<div>
							<h1 className="text-2xl font-semibold">Reviews</h1>
							{/* <li> */}
							{product.rating} of {product.numReviews} reviews
							{/* </li> */}
						</div>
					</div>
					{/* </div> */}
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
		},
	};
}
