
import Head from "next/head";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
export default function Layout({ title, children }) {


	return (
		<>
			<Head>
				<title>{title ? title + " - DapperFolio" : "DapperFolio"}</title>
				<meta name="description" content="Ecommerce Website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ToastContainer position="bottom-center" limit={1} />

			<div className="">
				<Navbar />
				<main className="w-screen m-auto px-8">
					{children}
				</main>
			
        <Footer/>
			</div>
		</>
	);
}
