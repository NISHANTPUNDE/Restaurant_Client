import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Ensure this is imported
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import bg1 from "../assets/bg1.png";
import bgimg from "../assets/pizza.avif";
import theme2 from "../assets/menu1.jpeg";
import bg3 from "../assets/bgmenu.png";
import menutitle from "../assets/menutitle.png";
// import { set } from "mongoose";

const Menu = () => {
  const { restaurant } = useParams(); // Access the parameter from the URL
  const [restodata, setrestodata] = useState(null);
  const [activeTab, setActiveTab] = useState("breakfast");
  const [activetemplate, setactivetemplate] = useState("");
  const [subscriptionisactive, setsubscriptionisactive] = useState(true);
  const [restoname, setrestoname] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/getallrestaurants`);
        const data = await response.json();
        console.log("filter from", data.data)
        console.log("username", restaurant)
        // Filter the data based on the restaurant name from the URL
        const matchedRestaurant = data.data.find(
          (item) => item.username.toLowerCase() === restaurant.toLowerCase()
        );
        console.log("filter data", matchedRestaurant.restaurant);
        setrestoname(matchedRestaurant.restaurant)
        if (matchedRestaurant === undefined || matchedRestaurant === null) {
          console.log("not found");
          setsubscriptionisactive(false);
        }

        if (matchedRestaurant) {
          // setFilteredData(matchedRestaurant);
          console.log("filter data ", matchedRestaurant);
          // Compare subscription_upto with the current date
          const subscriptionEndDate = new Date(
            matchedRestaurant.subscription_upto
          );
          // setsubsriptionenddate(subscriptionEndDate);
          const currentDate = new Date();

          // if (subscriptionEndDate >= currentDate) {
          //   setsubscriptionisactive(true);
          //   console.log("Subscription Status: Active", subscriptionEndDate);
          // } else {
          //   setsubscriptionisactive(false);
          //   console.log("Subscription Status: Expired");
          // }
          // Assuming subscriptionEndDate and currentDate are JavaScript Date objects
          // Assuming subscriptionEndDate and currentDate are Date objects
          // const currentDate = new Date(); // Example current date
          const gapInDays = Math.ceil(
            (currentDate - subscriptionEndDate) / (1000 * 60 * 60 * 24)
          ); // Difference in days

          if (currentDate <= subscriptionEndDate) {
            // Subscription is still active
            setsubscriptionisactive(true);
            console.log("Subscription Status: Active", subscriptionEndDate);
          } else if (gapInDays <= 5) {
            // Subscription expired but within the 5-day grace period
            setsubscriptionisactive(true);
            console.log("Subscription Status: Expired, within grace period");
          } else {
            // Subscription expired and beyond the 5-day grace period
            setsubscriptionisactive(false);
            console.log("Subscription Status: Expired and beyond grace period");
          }
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [restaurant]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/getmenuitem/${restoname}`
        );
        console.log("response data", res.data);
        setrestodata(res.data.data[0]);
        // console.log("resto data", res.data.data[0].dishmenuTemplete);
        const url = res.data.data[0].dishmenuTemplete;
        console.log("url", url);
        const filename = url.substring(url.lastIndexOf("/") + 1); // Gets the part after the last '/'
        // console.log("Filename:", filename); // Output: Theme5.png
        setactivetemplate(filename);
        setActiveTab(res.data.data[0].dishesByType[0].dishType);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurant();
  }, [restoname]);

  console.log("activetemplate", activetemplate);

  // loading sleton
  if (!restodata) {
    return (
      <>
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      {subscriptionisactive ? (
        <>
          {/* Theme 1 */}
          <section
            id="popular"
            className="module"
            style={{
              backgroundImage: `url(${bg3})`,
              height: "120vh",
              display: activetemplate === "Theme5.png" ? "flex" : "none",
              flexDirection: "column",
              position: "fixed",
              overflowY :" auto"
            }}
          >
            <div
              className="container"
              style={{
                flexShrink: 0, // Ensures the header doesn't shrink or scroll
              }}
            >
              <div className="row overflow-hidden">
                <div className="col-sm-6 col-sm-offset-3 flex justify-center h-[100px]">
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
                  {restodata.dishesByType?.map((type) => (
                    <div key={type.dishType} className="">
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
                              Rs. {dish.price}
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

          {/* Theme 2 */}
          <div
            className="min-h-screen flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${theme2})`,
              display: activetemplate === "Theme2.png" ? "block" : "none",
            }}
          >
            <div className="max-w-4xl mx-auto p-6 text-white">
              <div className="text-center mb-8">
                <h1 className="font-serif text-4xl font-bold uppercase text-white">
                  {restodata.hotelName || "Restaurant Name"}
                </h1>
                <div className="font-serif text-2xl font-semibold my-5">
                  <p className="text-sm">
                    {restodata.address || "Restaurant Address"}
                  </p>
                  <p className="text-sm">
                    {restodata.phone || "Restaurant Phone"}
                  </p>
                </div>
                <h3 className="text-white capitalize text-4xl font-bold border-b-4 border-yellow-400 inline-block">
                  Our Menu
                </h3>
              </div>

              <div className="flex overflow-x-auto mb-8">
                {restodata.dishesByType?.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(type.dishType)}
                    className={`text-white font-semibold py-2 px-6 mx-2 uppercase border border-gray-800 rounded-lg transition-colors ${activeTab === type.dishType
                        ? "bg-red-600 text-white"
                        : "bg-transparent"
                      } hover:bg-red-600 hover:text-white`}
                  >
                    {type.dishType.charAt(0).toUpperCase() +
                      type.dishType.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restodata.dishesByType
                  ?.find((type) => type.dishType === activeTab)
                  ?.dishes.map((dish, index) => (
                    <div key={index} className="  ">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white text-xl font-bold">
                          {" "}
                          {dish.dishName}
                        </h3>
                        <span className="text-yellow-400 text-lg">
                          Rs.{dish.price}
                        </span>
                      </div>
                      <p className="text-gray-300">
                        {dish.description || "Delicious Dish"}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Theme 3 */}
          <section
            id="our_menu"
            className="py-5 bg-[#202020]"
            style={{
              display: activetemplate === "Theme3.png" ? "block" : "none",
            }}
          >
            <div className="container mx-auto">
              <div className="text-center mb-8">
                <div className="text-red-600 font-serif text-5xl font-bold uppercase">
                  <p>{restodata.hotelName || "Restaurant Name"}</p>
                </div>
                <div className="text-yellow-500 font-serif text-2xl font-bold uppercase my-5">
                  <p className="text-sm">
                    {restodata.address || "Restaurant Address"}
                  </p>
                  <p className="text-sm">
                    {restodata.phone || "Restaurant Phone"}
                  </p>
                </div>
                <h1 className="text-4xl font-bold text-red-600 capitalize">
                  Our Menu
                </h1>
                <div className="relative mt-2">
                  <div className="absolute w-16 h-[2px] bg-red-600 inset-x-1/2 -translate-x-1/2"></div>
                  <div className="absolute w-8 h-[2px] bg-yellow-500 inset-x-1/2 top-1 -translate-x-1/2"></div>
                </div>
              </div>

              <div className="flex mb-8 overflow-x-auto">
                {restodata.dishesByType?.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(type.dishType)}
                    className={`px-6 py-2 mx-2 text-lg font-semibold rounded ${activeTab === type.dishType
                        ? "bg-red-600 text-white"
                        : "bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
                      }`}
                  >
                    {type.dishType.charAt(0).toUpperCase() +
                      type.dishType.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {restodata.dishesByType
                  ?.find((type) => type.dishType === activeTab)
                  ?.dishes.map((dish, index) => (
                    <div
                      key={index}
                      className="flex bg-gray-100 p-6 rounded-lg shadow-md relative hover:shadow-lg"
                    >
                      <img
                        src={bgimg || soup}
                        alt={dish.name}
                        className="w-1/3 h-32 object-cover rounded-lg mr-6"
                      />
                      <div>
                        <h4 className="text-xl font-semibold mb-1">
                          {dish.dishName}
                          <span className="float-right text-red-600">
                            ₹ {dish.price}
                          </span>
                        </h4>
                        <p className="text-gray-700">
                          {dish.description || "A delicious dish to enjoy!"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* Theme 4 */}
          <section
            id="popular"
            className="module"
            style={{
              backgroundImage: `url(${bg1})`,
              height: "150vh",
              display: activetemplate === "Theme4.png" ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <div
              className="container"
              style={{
                flexShrink: 0,
              }}
            >
              <div className="row overflow-hidden">
                <div className="col-sm-6 col-sm-offset-3">
                  <div
                    className="module-header wow fadeInUp animated"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    <h2 className="module-title">{restodata.hotelName}</h2>
                    <p className="mb-4">
                      Add. {restodata.address} & Phone. {restodata.phone}
                    </p>
                    <h3 className="module-subtitle">Our most popular menu</h3>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="menu-list-container"
              style={{
                flexGrow: 1,
              }}
            >
              <div className="row">
                <div className="max-w-4xl mx-auto p-6  rounded-lg  ">
                  {restodata.dishesByType?.map((type) => (
                    <div key={type.dishType} className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2 mb-4">
                        {type.dishType}
                      </h3>
                      <div className="space-y-4">
                        {type.dishes.map((dish) => (
                          <div
                            key={dish.dishName}
                            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          >
                            <h4 className="text-lg font-medium text-gray-700">
                              {dish.dishName}
                            </h4>
                            <h4 className="text-lg font-semibold text-orange-500">
                              ₹ {dish.price}
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
        </>
      ) : (
        <>
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
    </>
  );
};

export default Menu;
