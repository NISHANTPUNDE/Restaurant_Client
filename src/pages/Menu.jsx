import React from "react";
import soup from "../assets/soup.jpg";

const Menu = () => {
  return (
    <div class="max-w-4xl mx-auto  bg-white shadow-lg">
      <div class="grid grid-cols-4">
        <div class="bg-yellow-500  md:p-8 relative">
          <div class="absolute top-1/3 md:top-2/3 transform -rotate-90 text-white text-5xl  md:text-7xl font-bold">
            MENU
          </div>

          <div class="flex flex-col items-center justify-center mt-16  md:mt-32">
            <img
              src={soup}
              alt="Noodles"
              class="w-20 h-20 md:w-40 md:h-40  rounded-full"
            />
          </div>
        </div>

        <div class="p-8">
          <h1 class="text-5xl font-bold">FAUGET</h1>
          <h2 class="text-2xl font-semibold text-gray-500 mb-2">HOTEL</h2>
          <div class="flex items-center mb-6">
            <span class="text-xl">📞</span>
            <h3 class="text-xl font-semibold">+123-456-7890</h3>
          </div>

          <div class="mt-6">
            <h3 class="text-xl font-bold bg-yellow-400 px-2 py-1 inline-block mb-2">
              NOODLES
            </h3>
            <ul>
              <li class="flex justify-between">
                <span>Egg Noodles</span> <span>$5.00</span>
              </li>
              <li class="flex justify-between">
                <span>Rice Noodles </span> <span>$7.00</span>
              </li>
              <li class="flex justify-between">
                <span>Soy Ginger</span> <span>$6.50</span>
              </li>
              <li class="flex justify-between">
                <span>Ramen Noodles</span> <span>$4.00</span>
              </li>
              <li class="flex justify-between">
                <span>Soba Noodles</span> <span>$5.50</span>
              </li>
              <li class="flex justify-between">
                <span>Chicken Noodles</span> <span>$6.50</span>
              </li>
              <li class="flex justify-between">
                <span>Beef Noodles</span> <span>$6.00</span>
              </li>
            </ul>

            <h3 class="text-xl font-bold bg-yellow-400 px-2 py-1 inline-block mt-6 mb-2">
              SUSHI
            </h3>
            <ul>
              <li class="flex justify-between">
                <span>Nigiri Sushi</span> <span>$5.00</span>
              </li>
              <li class="flex justify-between">
                <span>Sashimi Sushi</span> <span>$7.00</span>
              </li>
              <li class="flex justify-between">
                <span>Maki Sushi</span> <span>$6.50</span>
              </li>
              <li class="flex justify-between">
                <span>Uramaki Sushi</span> <span>$4.00</span>
              </li>
              <li class="flex justify-between">
                <span>Temaki Sushi</span> <span>$5.50</span>
              </li>
              <li class="flex justify-between">
                <span>Hamachi Sushi</span> <span>$6.50</span>
              </li>
              <li class="flex justify-between">
                <span>Tiger Roll Sushi</span> <span>$6.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
