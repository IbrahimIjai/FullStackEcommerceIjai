import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../utils/Store";
import DropdownLink from "./DropdownLink";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/outline";

import useMediaQuery from "../hooks/useMediaQueryhooks";

import RenderThemeChanger from "./Switch";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

export default function Layout({ title, children }) {
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

  const [query, setQuery] = useState("");

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col w-screen justify-between ">
        <header className="bg-gradient-to-b from-sky-100 via-blue-100 to-blue-500 fixed top-0 left-0 right-0 w-screen z-20">
          <nav className="flex h-12 items-center px-8 justify-between shadow-md w-[100%]">
            <Link href="/">
              <a className="text-lg font-semibold">Market</a>
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden w-[50vw] justify-center md:flex">
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="bg-[none] rounded-tr-none rounded-br-none p-1 text-sm border border-gray-400  w-[100%] focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-blue-800 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2">
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>

            <div className="flex items-center justify-center md:space-x-4">
              <RenderThemeChanger />
              <div>
                <Link href="/cart">
                  <a className="p-2 flex items-center justify-center space-x-3">
                    <AiOutlineShoppingCart />
                    {isDesktop && <p>Cart</p>}
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
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
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history">
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
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}>
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 flex items-center justify-center space-x-2">
                    <AiOutlineUser />
                    {isDesktop && <p>Account</p>}
                  </a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className=" bg-blue-100 dark:bg-blue-900 w-screen m-auto mt-4 px-8">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner border-t-2">
          <p>Copyright © 2023 DevIbrahimIjai</p>
        </footer>
      </div>
    </>
  );
}
