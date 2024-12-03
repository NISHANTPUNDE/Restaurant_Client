import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./template1.css";
import { API_BASE_URL } from "../config/config";
import bg1 from "../assets/bg1.png";

const MenuItem = ({ title, price }) => (
  <div className="menu">
   
  </div>
);

const Theme4 = ({ menuData, dishesByType }) => {
  console.log("meanu card load ala")
  const { restaurant } = useParams();
  const [activeTab, setActiveTab] = useState("breakfast");
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    if (!menuData) {
      const fetchRestaurant = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/api/getmenuitem/${restaurant}`
          );
          console.log("data fetch from theme selected",res.data);
          const data = res.data.data[0];
          const fetchedMenuItems = {};

          data.dishesByType.forEach((item) => {
            fetchedMenuItems[item.dishType.toLowerCase()] = item.dishes.map(
              (dish) => ({
                name: dish.dishName,
                price: `$${dish.price}`,
                description: dish.description || "A delicious dish to enjoy!",
                imgSrc: bg1,
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
    } else {
      const preparedMenuItems = {};
      (dishesByType || []).forEach((item) => {
        preparedMenuItems[item.dishType] = item.dishes.map((dish) => ({
          name: dish.dishName,
          price: `Rs. ${dish.price}`,
          description: dish.description || "A delicious dish to enjoy!",
          imgSrc: bg1,
        }));
      });
      setMenuItems(preparedMenuItems);
      setActiveTab(Object.keys(preparedMenuItems)[0] || "breakfast");
    }
  }, [restaurant]);

  console.log("title", menuData, dishesByType);

  return (
    <section
    id="popular"
    className="module"
    style={{
      backgroundImage: `url(${bg1})`,
      height: "150vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      className="container"
      style={{
        flexShrink: 0, // Ensures the header doesn't shrink or scroll
      }}
    >
      <div className="row overflow-hidden">
        <div className="col-sm-6 col-sm-offset-3">
          <div
            className="module-header wow fadeInUp animated"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
            <h2 className="module-title">{menuData.hotelName}</h2>
            <p className="mb-4">
              Add. {menuData.address} & Phone. {menuData.phone}
            </p>
            <h3 className="module-subtitle">Our most popular menu</h3>
          </div>
        </div>
      </div>
    </div>
  
    <div
      className="menu-list-container"
      style={{
        overflowY: "auto",
        flexGrow: 1, // Allows this section to take remaining height
      }}
    >
      <div className="row">
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg ">
          {dishesByType.map((type) => (
            <div key={type._id} className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2 mb-4">
                {type.dishType} Dishes
              </h3>
              <div className="space-y-4">
                {type.dishes.map((dish) => (
                  <div
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    key={dish._id}
                  >
                    <h4 className="text-lg font-medium text-gray-700">{dish.dishName}</h4>
                    <h4 className="text-lg font-semibold text-orange-500">₹{dish.price}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default Theme4;
