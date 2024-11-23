import React, { useEffect, useState } from "react";
import soup from "../assets/soup.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/config";

const BlackTheme = ({ menuData, dishesByType }) => {
  const { restaurant } = useParams();
  const [menu, setMenu] = useState([]);
  console.log(menuData);
  console.log(menu);

  useEffect(() => {
    if (!menuData) {
      const fetchRestaurant = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/getmenuitem/${restaurant}`
          );
          setMenu(res?.data?.data[0]);
        } catch (error) {
          console.error(error);
        }
      };
      fetchRestaurant();
    } else {
      setMenu((prevMenu) => ({
        ...menuData,
        dishesByType: dishesByType || [],
      }));
    }
  }, [menuData, dishesByType, restaurant]);

  return (
    <div class="max-w-4xl mx-auto  bg-white shadow-lg">
      <div class="grid grid-cols-4">
        <div
          style={{
            backgroundColor: menu?.dishmenuColor
              ? menu?.dishmenuColor
              : "yellow",
          }}
          className="md:p-8 relative"
        >
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
        <div class="font-serif flex items-center justify-center text-5xl font-bold uppercase ">
          <p>{menuData.hotelName}</p>
        </div>
        <div class="font-serif flex flex-col items-center justify-center text-2xl font-bold uppercase my-5">
          <p className="text-sm">{menuData.address}</p>
        </div>
          {/* <h1 class="text-5xl font-bold">{restaurant}</h1>
          <h2 class="text-2xl font-semibold text-gray-500 mb-2">HOTEL</h2> */}
          <div class="flex items-center mb-6">
            <span class="text-xl">📞</span>
            <h3 class="text-xl font-semibold">{menu?.phone}</h3>
          </div>

          <div className="mt-6">
            {menu?.dishesByType?.map((item, index) => (
              <div key={index} className="mt-6">
                <h3 className="text-xl font-bold bg-yellow-400 px-2 py-1 inline-block mb-2">
                  {item?.dishType}
                </h3>
                <ul className="flex flex-col">
                  {item?.dishes?.map((dish, dishIndex) => (
                    <li key={dishIndex} className="flex justify-between">
                      <span>{dish?.dishName}</span> <span>${dish?.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackTheme;
