import React from 'react';
import Heros from './Heros';
import Category from './categories';
// import FeaturedProduct from './FeaturedProduct';
export default function HomePge() {
  return (
    <div className='relative w-full h-full'>
      <Heros/>
      <Category/>
      {/* <FeaturedProduct /> */}
    </div>
  )
}
