/** @format */

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
				<link rel="icon" href="/favicon2.ico" />
			</Head>

			<ToastContainer position="overflow-x-hidden" limit={1} />

			<div className="min-h-screen flex flex-col  justify-between">
				<>
				<Navbar />
				<main className="w-screen overflow-x-hidden mt-[80px]">{children}</main></>

				<Footer />
			</div>
		</>
	);
}
