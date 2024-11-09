import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import bgimg from "../assets/pizza.avif";

const Theme3 = () => {
  const { restaurant } = useParams();
  const [activeTab, setActiveTab] = useState("breakfast");
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getmenuitem/${restaurant}`
        );
        const data = res.data.data[0];
        const fetchedMenuItems = {};

        data.dishesByType.forEach((item) => {
          fetchedMenuItems[item.dishType.toLowerCase()] = item.dishes.map(
            (dish) => ({
              name: dish.dishName,
              price: `$${dish.price}`,
              description: dish.description || "A delicious dish to enjoy!",
              imgSrc: bgimg,
            })
          );
        });

        setMenuItems(fetchedMenuItems);
        setActiveTab(Object.keys(fetchedMenuItems)[0] || "breakfast");
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchRestaurant();
  }, [restaurant]);

  return (
    <section id="our_menu" className="py-5">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 capitalize">
            Our Menu
          </h1>
          <div className="relative mt-2">
            <div className="absolute w-16 h-[2px] bg-red-600 inset-x-1/2 -translate-x-1/2"></div>
            <div className="absolute w-8 h-[2px] bg-yellow-500 inset-x-1/2 -translate-x-1/2 top-1"></div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          {Object.keys(menuItems).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 mx-2 text-lg font-semibold rounded ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "text-black border border-red-600 hover:bg-red-600 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems[activeTab]?.map((item, index) => (
            <div
              key={index}
              className="flex bg-gray-100 p-6 rounded-lg shadow-md relative"
            >
              <img
                src={item.imgSrc}
                alt={item.name}
                className="w-1/3 h-32 object-cover rounded-lg mr-6"
              />
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  {item.name}{" "}
                  <span className="float-right text-red-600">{item.price}</span>
                </h4>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="#"
            className="btn bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Theme3;
