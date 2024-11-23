import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./template1.css";
import { API_BASE_URL } from "../config/config";
import bg1 from "../assets/bg1.png";

const MenuItem = ({ title, price }) => (
  <div className="menu">
    <div className="row">
      <div
        className="col-sm-8"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <h4 className="menu-title">{title}</h4>
        <h4 className="menu-price">{price}</h4>
      </div>
    </div>
  </div>
);

const Theme4 = ({ menuData, dishesByType }) => {
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

  return (
    <section
      id="popular"
      className="module"
      style={{ overflowY: "auto", height: "90vh" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div
              className="module-header wow fadeInUp animated"
              style={{ visibility: "visible", animationName: "fadeInUp" }}
            >
              <h2 className="module-title">Popular Dishes</h2>
              <h3 className="module-subtitle">Our most popular menu</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            {menuItems[activeTab] &&
              menuItems[activeTab].map((dish, index) => (
                <MenuItem key={index} title={dish.name} price={dish.price} />
              ))}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="devider"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme4;
