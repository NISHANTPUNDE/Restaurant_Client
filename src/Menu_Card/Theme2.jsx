import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import bgimg from "../assets/menu1.jpeg";

export default function Theme2() {
  const { restaurant } = useParams();
  const [activeMenu, setActiveMenu] = useState("");
  const [menuItems, setMenuItems] = useState({});
  const buttonsRef = useRef([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getmenuitem/${restaurant}`
        );
        const data = res.data.data[0];
        const fetchedMenuItems = {};
        console.log(res.data);

        data.dishesByType.forEach((item) => {
          fetchedMenuItems[item.dishType] = item.dishes.map((dish) => ({
            title: dish.dishName,
            price: `$${dish.price}`,
            description: dish.description || "A delicious dish to enjoy!",
          }));
        });

        setMenuItems(fetchedMenuItems);
        setActiveMenu(Object.keys(fetchedMenuItems)[0] || "");
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchRestaurant();
  }, [restaurant]);

  const handleMenuClick = (e, menu) => {
    e.preventDefault(); // Prevents the default page refresh
    setActiveMenu(menu);
    console.log("Menu selected:", menu);
  };

  console.log(menuItems);

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgimg})`,
      }}
    >
      <div className="max-w-3xl mx-auto p-8 text-white">
        <h2 className="text-5xl font-bold border-b-4 border-yellow-400 mb-8 inline-block">
          Our Menu
        </h2>
        <div className="flex justify-center flex-wrap mb-8">
          {Object.keys(menuItems).map((menu, index) => (
            <button
              key={menu}
              ref={(el) => (buttonsRef.current[index] = el)}
              data-target={menu}
              onClick={(e) => handleMenuClick(e, menu)} // Corrected event handling
              className={`text-white font-semibold py-2 px-4 m-2 uppercase ${
                activeMenu === menu ? "bg-yellow-400" : "bg-transparent"
              } border border-yellow-400 rounded transition-colors`}
            >
              {menu}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems[activeMenu]?.map((item, index) => (
            <div key={index} className="border-b border-gray-600 pb-4">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <span className="text-yellow-400 text-xl">{item.price}</span>
              </div>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
