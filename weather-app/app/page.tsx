"use client";
import React, { useEffect, useState } from "react";
import Input from "./components/input";
import Current from "./components/Current";
import Details from "./components/Details";
import Weekly from "./components/Week";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

const url = `http://api.weatherapi.com/v1/forecast.json?key=7420191a977840c69c1165308232109&q=${location}&days=7&aqi=yes&alerts=yes

`;



  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("Please enter a valid location");
        setData({});
      }
    }
  };

  let content;

  if(Object.keys(data).length===0 && error===''){
    content=<div className="text-center
    text-white h-screen mt-[5rem]">
      <h2 className="text-3xl font-bold mb-4">Welcome to Weather App</h2>
      <p className="text-xl ">Enter a City Name to get Weather Forecast</p>
      <p>Note: Enter a City name with Capital Letter</p>
    </div>
  }else if(error !==''){
    content=<div className="text-center
    text-white h-screen mt-[5rem]"> 
      <p className="text-3xl font-bold mb-4">City not Found</p>
      <p className="text-xl">Enter a Valid City</p>
    </div>
  }else{
    content=(
      <>
      <div className="flex md:flex-row flex-col p-12 items-center justify-between">
   <Current data={data}/>
   <Weekly data={data}/>
    </div>
    <div>
      <Details data={data}/>
    </div>
    </>
    )
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className="bg-white/25 w-full  flex flex-col h-fit h-fit">
        <div className="flex flex-col justify-between  items-center p-12 md:flex-row">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">
            Weather APP
          </h1>
        </div>

     {content}

      </div>
    </div>
  );
};

export default Home;
