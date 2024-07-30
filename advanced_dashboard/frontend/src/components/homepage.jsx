import { IoSettingsOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import { FaSpotify } from "react-icons/fa";
import { MdChat } from "react-icons/md";

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <p className='relative right-12 top-6 text-2xl'>{currentTime}</p>;
}

function Homepage() {
  const [weather, setWeather] = useState(null);
  const [wcond, setWcond] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/weather')
      .then(response => response.json())
      .then(data => {
        setWeather(data.temperature);
        setWcond(data.condition);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className=''>
      <div className='flex justify-evenly w-screen pt-20'>
        <a href="/chat">
          <div className='spotify h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all hover:translate-x-3  shadow-3xl shadow-[#ff0088d8] border rounded-2xl'>
            <MdChat className='text-pink-400 relative my-auto' size={60}/>
          </div>
        </a>
        <div className='spotify h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all shadow-3xl shadow-[#00c8ff7d] border rounded-2xl'>
          <MdCall className='text-cyan-400 relative my-auto' size={60}/>
        </div>
        <a href="https://open.spotify.com/">
          <div className='spotify h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all shadow-3xl shadow-[#32ff696e] border rounded-2xl'>
            <FaSpotify className='text-[#1ED760] relative my-auto' size={60}/>
          </div>
        </a>
        <div className='spotify h-96 w-64 relative bg-gradient-to-b flex justify-center hover:scale-110 duration-300 transition-all hover:-translate-x-3 shadow-3xl shadow-[#ffffff52] border rounded-2xl'>
          <IoSettingsOutline className='text-white relative my-auto' size={60}/>
        </div>
      </div>
      <div className='relative top-4 flex justify-between'>
        <div className='text-white'>
          <p className='relative left-12 top-6 text-2xl pr-1 mr-14'>{weather ? `${wcond} : ${weather}°C` : 'Loading...'}</p>
        </div>
        
        <div className='text-white'>
          <Clock />
        </div>
      </div>
      
    </div>
  );
}

export default Homepage;