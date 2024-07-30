import React from 'react';
import { IoHomeSharp } from "react-icons/io5";

const homebtn = () => {
  return (
      <div className='flex justify-center'>
        <div className="">
            <a href="/">
            <div className='rounded-full hover:scale-125 duration-300 transition-all p-2 hover:shadow-3xl hover:-translate-y-2'>
                <IoHomeSharp className='text-white relative' size={50}/>
            </div>
            </a>
        </div>
      </div>
    )
}
export default homebtn;