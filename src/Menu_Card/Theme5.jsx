import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./template1.css";
import { API_BASE_URL } from "../config/config";
import bg1 from "../assets/bgmenu.png";
import menutitle from "../assets/menutitle.png";

const MenuItem = ({ title, price }) => <div className="menu"></div>;

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
          <div className="col-sm-6 col-sm-offset-3 flex justify-center">
            <div
              className="module-header wow fadeInUp animated"
              style={{ visibility: "visible", animationName: "fadeInUp" }}
            >
              <img src={menutitle} className="w-[50%] mx-auto" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="menu-list-container"
        style={{
          flexGrow: 1, // Allows this section to take remaining height
        }}
      >
        <div className="row">
          <div className="max-w-4xl mx-auto p-6  ">
            {dishesByType.map((type) => (
              <div key={type._id} className="">
                <h3 className="text-xl font-bold text-[#eff0f2] border-b-2 mt-2 bg-[#633c28] p-2 w-[fit-content] rounded-lg">
                  {type.dishType} 
                </h3>
                <div className="space-y-4">
                  {type.dishes.map((dish) => (
                    <div
                      className="flex justify-between items-center pt-2 font-[inter] text-[#312609] "
                      key={dish._id}
                    >
                      <h4 className="text-[26px] text-[#312609] font-bold ">
                        {dish.dishName}
                      </h4>
                      <h4 className="text-[26px] text-[#312609] font-bold">
                        ₹{dish.price}
                      </h4>
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
