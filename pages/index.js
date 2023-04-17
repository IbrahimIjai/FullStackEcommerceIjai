import axios from "axios";
import { useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import Image from "next/image"
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

export default function Home({ products, featuredProducts }) {
  const [ScrollInd, setScrollInd] = useState("b");
  const ItemContainerRef = useRef();
  console.log(products);
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
      <div className="mt-[10vh] w-screen">
        <Carousel showThumbs={false} autoPlay>
          {featuredProducts.map((product) => (
            <div key={product._id}>
              <Link href={`/product/${product.slug}`} passHref>
                <a className="flex">
                  <div className="relative w-[300px] h-[300px]">
                    <Image src={product.banner} alt={product.name} fill styles={{objectFit:"cover"}} />
                  </div>
                  
                </a>
              </Link>
            </div>
          ))}
        </Carousel>
        <h2 className="h2 my-4 font-bold underlined">Latest Products</h2>
        <div
          className="flex items-center justify-start gap-3 no-scrollbar overflow-x-auto  w-[90%]"
          onScroll={(e) => {
            const { scrollWidth, scrollLeft, offsetWidth } = e.target;
            const SL = Math.ceil(scrollLeft + offsetWidth);
            if (scrollLeft <= 0) setScrollInd("b");
            if (scrollLeft > 0 && scrollLeft < scrollWidth) setScrollInd("m");
            if (SL >= scrollWidth) setScrollInd("e");
          }}
          ref={ItemContainerRef}
          >
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}></ProductItem>
          ))}
        </div>
        <div className="w-[100%] flex items-center justify-end px-[10vw] py-[3vh] ">
          <div
            className="blogNavs"
            active={ScrollInd === "e" || ScrollInd === "m"}>
            <BiLeftArrow
              onClick={() => {
                ItemContainerRef.current.scroll({
                  left: ItemContainerRef.current.scrollLeft - 200,
                  behavior: "smooth",
                });
              }}
              size={30}
            />
          </div>
          <div
            className="blogNavs"
            active={ScrollInd === "b" || ScrollInd === "m"}>
            <BiRightArrow
              onClick={() => {
                ItemContainerRef.current.scroll({
                  left: ItemContainerRef.current.scrollLeft + 200,
                  behavior: "smooth",
                });
              }}
              size={30}
            />
          </div>
        </div>
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
