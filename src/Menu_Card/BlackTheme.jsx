import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import img from "../assets/bg.svg";

const BlackTheme = () => {
  return (
    <div className="card-menu w-[100%] h-[700px] bg-primary shadow-lg flex flex-col justify-between overflow-hidden rounded-lg p-4">
      {/* Header Section */}
      <div className="header relative w-full h-[150px] flex justify-center mt-3">
        <img
          src={img}
          alt="bg"
          className="w-full absolute left-0 transform scale-y-[-1] -top-[100px] md:h-[200px] lg:h-[250px]"
        />
        <h1 className="main-title relative text-light uppercase text-2xl font-bold">
          yashoda hotel Menu
        </h1>
      </div>

      {/* Main Section */}
      <div className="main px-6 md:px-12 mx-auto h-[350px] flex flex-wrap gap-y-1 md:pl-32 ">
        {/* Row 1: Food and Drink */}
        <div className="flex items-center w-full justify-between ">
          {/* Food Section */}
          <ul className=" w-1/2 mr-4 ">
            <h2 className="title text-xl uppercase mb-2">Food</h2>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Burger Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Burger Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Burger Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Burger Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Burger Name</h3>
              <span className="font-medium">$10</span>
            </li>
          </ul>

          {/* Drink Section */}
          <ul className="drink w-1/2 ">
            <h2 className="title text-xl uppercase mb-2">Drink</h2>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Drink Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Drink Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Drink Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Drink Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Drink Name</h3>
              <span className="font-medium">$10</span>
            </li>
          </ul>
        </div>

        {/* Row 2: Dessert and Additional */}
        <div className="flex w-full justify-between md:justify-normal md:gap-3 ">
          {/* Dessert Section */}
          <ul className="dessert w-1/2 mr-4 ">
            <h2 className="title text-xl uppercase mb-2">Dessert</h2>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Dessert Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Dessert Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Dessert Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Dessert Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Dessert Name</h3>
              <span className="font-medium">$10</span>
            </li>
            {/* Repeat similar items */}
          </ul>

          {/* Additional Section */}
          <ul className="additional w-1/2 ">
            <h2 className="title text-xl uppercase mb-2">Additional</h2>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Additional Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Additional Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Additional Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Additional Name</h3>
              <span className="font-medium">$10</span>
            </li>
            <li className="flex items-center justify-between md:justify-normal md:gap-3 ">
              <h3 className="list-title capitalize text-sm">Additional Name</h3>
              <span className="font-medium">$10</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer relative w-full h-[150px] flex justify-center items-center">
        <img
          src={img}
          alt="bg"
          className="w-full absolute left-0 transform scale-x-[-1] top-0 md:h-[200px] lg:h-[250px]"
        />
        <ul className="social-media flex items-center relative list-none mt-5">
          <li className="w-8 h-8 text-dark bg-light flex items-center justify-center rounded-full ml-2 border border-dark cursor-pointer transition hover:bg-dark hover:text-primary hover:border-light">
            <FaInstagram />
          </li>
          <li className="w-8 h-8 text-dark bg-light flex items-center justify-center rounded-full ml-2 border border-dark cursor-pointer transition hover:bg-dark hover:text-primary hover:border-light">
            <FaFacebookF />
          </li>
          <li className="w-8 h-8 text-dark bg-light flex items-center justify-center rounded-full ml-2 border border-dark cursor-pointer transition hover:bg-dark hover:text-primary hover:border-light">
            <FaTwitter />
          </li>
          <li className="w-8 h-8 text-dark bg-light flex items-center justify-center rounded-full ml-2 border border-dark cursor-pointer transition hover:bg-dark hover:text-primary hover:border-light">
            <FaWhatsapp />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlackTheme;
