import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import bgimg from "../assets/menu1.jpeg";
import { API_BASE_URL } from "../config/config";

const Theme2 = ({ menuData, dishesByType }) => {
  console.log("meanu card load ala")
  const { restaurant } = useParams();
  const [menuItems, setMenuItems] = useState({});
  const [activeMenu, setActiveMenu] = useState("");
  const buttonsRef = useRef([]);

  useEffect(() => {
    if (!menuData) {
      const fetchRestaurant = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/getmenuitem/${restaurant}`
          );

          
          const data = res.data.data[0];
          const fetchedMenuItems = {};
          data?.dishesByType.forEach((item) => {
            fetchedMenuItems[item.dishType] = item.dishes.map((dish) => ({
              title: dish.dishName,
              price: `$${dish.price}`,
              description: dish.description || "A delicious dish to enjoy!",
            }));
          });
          setMenuItems(fetchedMenuItems);
          console.log("data fetch from theme selected",fetchedMenuItems);
          setActiveMenu(Object.keys(fetchedMenuItems)[0] || "");
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      };
      fetchRestaurant();
    } else {
      const preparedMenuItems = {};
      (dishesByType || []).forEach((item) => {
        preparedMenuItems[item.dishType] = item.dishes.map((dish) => ({
          title: dish.dishName,
          price: `Rs. ${dish.price}`,
          description: dish.description || "A delicious dish to enjoy!",
        }));
      });
      setMenuItems(preparedMenuItems);
      setActiveMenu(Object.keys(preparedMenuItems)[0] || "");
    }
  }, [menuData, dishesByType, restaurant]);

  const handleMenuClick = (e, menu) => {
    e.preventDefault();
    setActiveMenu(menu);
  };
  console.log(menuItems);
  console.log("menuData", menuData);

  console.log("dishesByType",dishesByType);

  return (
    <div
      className="min-h-screen flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgimg})`,
      }}
    >
      <div className="max-w-3xl mx-auto p-8 text-white">
        <div class="font-serif flex items-center justify-center text-4xl font-bold uppercase ">
          <p>{menuData.hotelName}</p>
        </div>
        <div class="font-serif flex flex-col items-center justify-center text-2xl font-bold uppercase my-5">
          <p className="text-sm">{menuData.address}</p>
         
          <p className="text-sm">{menuData.phone}</p>
          <h3 className="text-white capitalize text-4xl font-bold border-b-4 mt-6 border-yellow-400 mb-8 inline-block">
          Our Menu
        </h3>
        </div>
       
        <div className="flex justify-center flex-wrap mb-8">
          {Object.keys(menuItems).map((menu, index) => (
            <button
              key={menu}
              ref={(el) => (buttonsRef.current[index] = el)}
              data-target={menu}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(e, menu);
              }}
              className={`text-white font-semibold py-2 px-4 m-2 uppercase  border border-gray-800 rounded transition-colors ${
                menu ? "bg-red-600" : ""
              }`}
              style={{
                backgroundColor:
                  activeMenu === menu
                    ? menuData?.dishmenuColor
                      ? menuData?.dishmenuColor
                      : menu?.dishmenuColor
                    : "transparent",
              }}
            >
              {menu}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItems[activeMenu]?.map((item, index) => (
            <div key={index} className="border-b border-gray-600 pb-4 ml-[30px]" >
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                <span className="text-yellow-400 text-xl">{item.price}</span>
              </div>
              {/* <p className="text-gray-300">{item.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theme2;
