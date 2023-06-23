/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded hover:scale-105 transition duration-500 ease-in-out shadow object-cover h-44 w-full"
          />
        </a>
      </Link>
      <p className="bg-white rounded-lg p-1 font-bold  absolute top-4 left-4 mb-2 text-[.8rem]">{product.slug}</p>
      <div className="flex flex-col items-start justify-center p-3">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg font-bold text-[.9rem]">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2 text-[.8rem]">{product.brand}</p>
        
        <div className="flex w-full justify-between items-center space-x-8">
          <p className='font-bold text-[.9rem]'>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
        </div>
        
      </div>
    </div>
  );
}
