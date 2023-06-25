/** @format */

import ProductItem from "../../components/ProductItem";
import React, { useContext, useEffect, useState } from "react";

import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";

function FeaturedProduct() {
    const [items, setItems] = useState(null)
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

	useEffect(async () => {
		await db.connect();
		// const products = await Product.find().lean();
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
        const products = await featuredProducts.map(db.convertDocToObj);
        setItems(products)
        console.log("yooo I AM item",items);
	});

	// console.log(featuredProducts);
	return (
		<div>
			<div>
				{items.map((item) => {
					return (
						<div key={item?.slug}>
							<ProductItem product={item} addToCartHandler={addToCartHandler} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FeaturedProduct;
// export async function getServerSideProps() {
// 	await db.connect();
// 	const products = await Product.find().lean();
// 	const featuredProducts = await Product.find({ isFeatured: true }).lean();
// 	return {
// 		props: {
// 			featuredProducts: featuredProducts.map(db.convertDocToObj),
// 			products: products.map(db.convertDocToObj),
// 		},
// 	};
// }
