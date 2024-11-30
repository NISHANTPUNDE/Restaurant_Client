import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BlackTheme from "../Menu_Card/BlackTheme";
import Theme2 from "../Menu_Card/Theme2";
import Theme3 from "../Menu_Card/Theme3";
import Theme4 from "../Menu_Card/Theme4";
import Theme5 from "../Menu_Card/Theme5";
import { API_BASE_URL } from "../config/config";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();
  const [dataRestro, setDataRestro] = useState({
    hotelName: "",
    address: "",
    phone: "",
    dishmenuTemplete: "",
    dishmenuColor: "",
  });
  const [dishesByType, setDishesByType] = useState([]);
  const [dishType, setDishType] = useState("");
  const [menuImages, setMenuImages] = useState([]);
  const { restaurant } = useParams();
  const [previouscustdata, setpreviouscustdata] = useState(false);
  const [updatemode, setupdatemode] = useState(false);
  const [subscriptionisactive, setsubscriptionisactive] = useState(true);
  const [subsriptionenddate, setsubsriptionenddate] = useState("");



  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/getallrestaurants`);
        const data = await response.json();

        // Filter the data based on the restaurant name from the URL
        const matchedRestaurant = data.data.find(
          (item) => item.restaurant.toLowerCase() === restaurant.toLowerCase()
        );
        console.log("filter data",matchedRestaurant)
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
          setsubsriptionenddate(subscriptionEndDate);
          const currentDate = new Date();

          // if (subscriptionEndDate >= currentDate) {
          //   setsubscriptionisactive(true);
          //   console.log("Subscription Status: Active", subscriptionEndDate);
          // } else {
          //   setsubscriptionisactive(false);
          //   console.log("Subscription Status: Expired");
          // }
          if (subscriptionEndDate >= currentDate) {
            setsubscriptionisactive(true);
            console.log("Subscription Status: Active", subscriptionEndDate);
          
            const gapInDays = Math.ceil((subscriptionEndDate - currentDate) / (1000 * 60 * 60 * 24)); // Calculate gap in days
          
            if (gapInDays > 5) {
              console.log("Gap: More than five days");
            } else {
              console.log("Gap: Less than or equal to five days");
              setShowAlert(true)
            }
          } else {
            setsubscriptionisactive(false);
            console.log("Subscription Status: Expired");
          }
          
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [restaurant]);

  useEffect(() => {
    fetch(`http://localhost:3012/api/getmenuitem/${restaurant}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data.data.length); // Log the data correctly
        setpreviouscustdata(data.data.length === 0 ? false : true);
        setDataRestro({
          hotelName: data.data[0].hotelName,
          address: data.data[0].address,
          phone: data.data[0].phone,
          dishmenuTemplete: data.data[0].dishmenuTemplete,
          dishmenuColor: data.data[0].dishmenuColor,
        });
        console.log("dishdata", data.data);
        setDishesByType(data.data[0].dishesByType);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, [restaurant]);

  console.log("previouscustdata", previouscustdata);

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/getmenuimages`);
        setMenuImages(res.data.images);
        console.log("fetchmenuimages", res.data.images);
      } catch (error) {
        console.error("Error fetching menu images:", error);
      }
    };
    fetchMenuImages();
  }, []);

  const handleAddDish = (index) => {
    const newDishesByType = [...dishesByType];
    newDishesByType[index].dishes.push({ dishName: "", price: "" });
    setDishesByType(newDishesByType);
  };

  const handleRemoveDish = (dishTypeIndex, dishIndex) => {
    const newDishesByType = [...dishesByType];
    newDishesByType[dishTypeIndex].dishes = newDishesByType[
      dishTypeIndex
    ].dishes.filter((_, i) => i !== dishIndex);
    setDishesByType(newDishesByType);
  };

  const handleDishChange = (dishTypeIndex, dishIndex, field, value) => {
    const newDishesByType = [...dishesByType];
    newDishesByType[dishTypeIndex].dishes[dishIndex][field] = value;
    setDishesByType(newDishesByType);
  };

  const handleAddDishType = () => {
    if (dishType.trim()) {
      setDishesByType([
        ...dishesByType,
        { dishType, dishes: [{ dishName: "", price: "" }] },
      ]);
      setDishType("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Valid Data.",
      });
      // toast.error("Enter Valid Data.");
    }
  };

  const handleRemoveDishType = (index) => {
    const newDishesByType = dishesByType.filter((_, i) => i !== index);
    setDishesByType(newDishesByType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/restaurant/add`, {
        dataRestro,
        dishesByType,
        restaurant,
      });
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        window.location.reload(); // Refresh the page when "OK" is clicked
      });
      // toast.success(response.data.message);
      setDataRestro({
        hotelName: "",
        address: "",
        phone: "",
        dishmenuTemplete: "",
        dishmenuColor: "",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Enter Valid Data.",
      });
      // toast.error("Something Went Wrong.");
      // alert("An error occurred. Please check the console for more details.");
    }
  };

  // State to handle the toggle for navbar
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const trimmedFilename = dataRestro.dishmenuTemplete
    .replace(`http://api.restaurant.deveraa.com/public/`, "")
    .replace(/\.[^/.]+$/, "");
  const ThemeComponent = trimmedFilename;

  // update the menu card
  const updatemenucard = async (e) => {
    console.log("menu card updated");
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/api/restaurant/edit`, {
        dataRestro,
        dishesByType,
        restaurant,
      });
      // toast.success(response.data.message);
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        window.location.reload(); // Refresh the page when "OK" is clicked
      });

      navigate(`/admin/${restaurant}`);
      //  location.reload();
      // {`/admin/${restaurant}`}
      // alert(response.data.message);
      // setDataRestro({
      //   hotelName: "",
      //   address: "",
      //   phone: "",
      //   dishmenuTemplete: "",
      //   dishmenuColor: "",
      // });
    } catch (error) {
      console.error(error);
      // toast.error("Something Went Wrong. ");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong.",
      });
      // alert("An error occurred. Please check the console for more details.");
    }
  };

  const menuDelete = () => {
    Swal.fire({
      title: "Do you Really want to Delete the Menucard ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Delete();
      } else if (result.isDenied) {
        Swal.fire("Menu card was not Delete", "", "info");
      }
    });
    //
  };

  // delete menu card
  const Delete = async () => {
    console.log("delete menu card");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/restaurant/delete/?restaurant=${restaurant}`
      );
      Swal.fire({
        title: "Good job!",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        window.location.reload(); // Refresh the page when "OK" is clicked
      });
      // toast.success(response.data.message);
      // alert(response.data.message);
      navigate(`/admin/${restaurant}`);
      // location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something Went Wrong.",
      });
      // toast.error("Something Went Wrong. ");
      // alert("An error occurred. Please check the console for more details.");
    }
  };

  console.log("dataRestro", dataRestro);

  return (
    <>
      {subscriptionisactive === true ? (
        <>
          <Toaster />
          {/* navbar */}
          <nav className="bg-white  border-gray-200 shadow-xl dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src="https://blog.deveraa.com/_next/static/media/deveraa.52ebdceb.jpg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {/* DevEraa Resto */}
                </span>
              </a>
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } w-full md:block md:w-auto`}
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    {/* <button
                  onClick={toggleModal}
                  className="block py-2 px-3 text-white bg-blue-700 md:bg-blue-700 md:text-white md:rounded rounded  w-full "
                >
                  View Restaurant
                </button> */}
                  </li>
                  {/* <li>
                <span className="block py-2 px-3 text-white bg-blue-700 md:bg-blue-700 md:text-white md:rounded rounded w-full">
                  <Link to={`/admin/${restaurant}`}>Home</Link>
                </span>
              </li> */}
                </ul>
              </div>
            </div>
          </nav>
          {/* <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">Info alert!</span> Your Subscription
            has been end on{" "}
            <strong>{new Date(subsriptionenddate).toDateString()}</strong>
          </div> */}
          {showAlert && (
            <div
              id="alert-1"
              className="w-[50%] mx-[auto] mt-3 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div className="ms-3 text-sm font-medium">
                Your Subscription has been end on{" "}
                <strong>{new Date(subsriptionenddate).toDateString()}</strong>
              </div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                onClick={() => setShowAlert(false)} // Hide the alert on click
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="max-w-4xl mx-auto bg-customGray p-6 rounded shadow-md">
            <form>
              <div
                style={{ display: previouscustdata ? "none" : "block" }}
                className={` mb-6 ${
                  dataRestro.dishmenuTemplete
                    ? "hidden"
                    : "grid-cols-2 md:grid-cols-2"
                }`}
              >
                <h2 className="text-2xl font-semibold font-merienda italic text-burlywood">
                  Select Menu Template
                </h2>

                {/* <div className={`grid w-full gap-2 grid-cols-2 md:grid-cols-2 `}>
              {menuImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setDataRestro({ ...dataRestro, dishmenuTemplete: image })
                  }
                  className="relative flex flex-col mt-3  shadow-sm border border-slate-200 rounded-lg w-full "
                  style={{
                    display:
                      dataRestro.dishmenuTemplete === image ||
                      !dataRestro.dishmenuTemplete || !previouscustdata
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="relative h-64 m-2.5 overflow-hidden text-white rounded-md">
                    <img
                      src={image}
                      alt="card-image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div> */}
                <div
                  className={`grid w-full gap-2 ${
                    dataRestro.dishmenuTemplete
                      ? "grid-cols-2"
                      : "grid-cols-2 md:grid-cols-2"
                  }`}
                >
                  {menuImages.map((image, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        setDataRestro({
                          ...dataRestro,
                          dishmenuTemplete: image,
                        })
                      }
                      className={`relative flex flex-col mt-3 shadow-sm border rounded-lg w-full transition-transform duration-300 ${
                        dataRestro.dishmenuTemplete === image
                          ? "border-green-500 bg-green-100 scale-105 shadow-lg"
                          : "border-gray-300 hover:border-blue-500 hover:scale-105"
                      }`}
                      style={{
                        display:
                          dataRestro.dishmenuTemplete === image ||
                          !dataRestro.dishmenuTemplete ||
                          !previouscustdata
                            ? "block"
                            : "none",
                      }}
                    >
                      <div className="relative h-64 m-2.5 overflow-hidden text-white rounded-md">
                        <img
                          src={image}
                          alt="card-image"
                          className="w-full h-full object-inherit"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* menu card desing */}
              <div
                className="menupreview"
                style={{
                  display: !dataRestro.dishmenuTemplete ? "none" : "block",
                }}
              >
                <div style={{ display: previouscustdata ? "none" : "block" }}>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold font-merienda italic text-burlywood">
                      Select Menu Color
                    </h2>
                    <div
                      // style={{ borderColor: `${dishmenuColor}` }}
                      class="border-burlywood flex items-center text-2xl w-48 border-2 mt-3 rounded-lg p-0"
                    >
                      <input
                        type="color"
                        id="color-picker"
                        class=" w-10 h-10 outline-none bg-transparent border-none"
                        onChange={(e) =>
                          setDataRestro({
                            ...dataRestro,
                            dishmenuColor: e.target.value,
                          })
                        }
                      />
                      <span
                        id="value"
                        className=" text-burlywood text-right ml-1"
                      >
                        {dataRestro.dishmenuColor}
                      </span>
                    </div>
                  </div>
                  <div className=" ">
                    <div className="grid  md:grid-cols-2 gap-6">
                      <div>
                        <div className="relative z-0">
                          <input
                            type="text"
                            value={dataRestro.hotelName}
                            onChange={(e) =>
                              setDataRestro({
                                ...dataRestro,
                                hotelName: e.target.value,
                              })
                            }
                            id="floating_standard"
                            className="text-white block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="floating_standard"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                          >
                            Hotel Name
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="relative z-0">
                          <input
                            type="text"
                            value={dataRestro.phone}
                            onChange={(e) =>
                              setDataRestro({
                                ...dataRestro,
                                phone: e.target.value,
                              })
                            }
                            id="floating_standard"
                            className="text-white block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="floating_standard"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                          >
                            Phone
                          </label>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="relative z-0 ">
                      <input
                        type="text"
                        value={dataRestro.address}
                        onChange={(e) =>
                          setDataRestro({
                            ...dataRestro,
                            address: e.target.value,
                          })
                        }
                        id="floating_standard"
                        className="text-white block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_standard"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Address
                      </label>
                    </div>
                  </div>

                  {dishesByType.map((dishTypeObj, dishTypeIndex) => (
                    <div key={dishTypeIndex} className="mb-6">
                      <div
                        className="border rounded-lg border-none p-3 my-2"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        }}
                      >
                        <h2 className="text-2xl text-burlywood font-semibold mb-4">
                          {dishTypeObj.dishType ||
                            `Dish Type ${dishTypeIndex + 1}`}
                        </h2>
                        {dishTypeObj.dishes.map((dish, dishIndex) => (
                          <div
                            key={dishIndex}
                            className="grid grid-cols-1 items-center gap-2"
                          >
                            <div>
                              {/* <label className="block text-sm font-bold mb-2">
                        Dish Name
                      </label>
                      <input
                        type="text"
                        value={dish.dishName}
                        onChange={(e) =>
                          handleDishChange(
                            dishTypeIndex,
                            dishIndex,
                            "dishName",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter Dish Name"
                        required
                      /> */}
                              <div className="relative z-0 mt-4">
                                <input
                                  type="text"
                                  value={dish.dishName}
                                  onChange={(e) =>
                                    handleDishChange(
                                      dishTypeIndex,
                                      dishIndex,
                                      "dishName",
                                      e.target.value
                                    )
                                  }
                                  id="floating_standard"
                                  className="text-white block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                                  placeholder=" "
                                  required
                                />
                                <label
                                  htmlFor="floating_standard"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                  Enter Dish Name
                                </label>
                              </div>
                            </div>
                            <div>
                              {/* <label className="block text-sm font-bold mb-2">
                        Price
                      </label>
                      <input
                        type="text"
                        value={dish.price}
                        onChange={(e) =>
                          handleDishChange(
                            dishTypeIndex,
                            dishIndex,
                            "price",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter Price"
                        required
                      /> */}
                              <div className="relative z-0">
                                <input
                                  type="number"
                                  value={dish.price}
                                  onChange={(e) =>
                                    handleDishChange(
                                      dishTypeIndex,
                                      dishIndex,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  id="floating_standard"
                                  className="text-white block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                                  placeholder=" "
                                  required
                                />
                                <label
                                  htmlFor="floating_standard"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                  Price
                                </label>
                              </div>
                            </div>
                            <div>
                              <button
                                className="bg-orange-500 text-white px-6 py-2 w-full rounded my-4"
                                type="button"
                                onClick={() =>
                                  handleRemoveDish(dishTypeIndex, dishIndex)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex w-full">
                        <button
                          className="bg-lime-500 text-white px-6 py-2 rounded mt-2 w-6/12"
                          type="button"
                          onClick={() => handleAddDish(dishTypeIndex)}
                        >
                          Add Dish
                        </button>
                        <button
                          className="bg-orange-500 text-white px-6 py-2 rounded mt-2 ml-2 w-6/12"
                          type="button"
                          onClick={() => handleRemoveDishType(dishTypeIndex)}
                        >
                          Remove Dish
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mb-6">
                    {/* <h2 className="text-2xl font-semibold mb-4">Add New Dish Type</h2> */}
                    {/* <input
              type="text"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-2"
              placeholder="Enter Dish Type (e.g., Noodles, Sushi)"
              required
            /> */}
                    <div className="relative z-0 mt-5">
                      <input
                        type="text"
                        value={dishType}
                        id="floating_standard"
                        onChange={(e) => setDishType(e.target.value)}
                        className="text-white block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-burlywood appearance-none dark:text-white dark:border-gray-600 dark:focus:border-burlywood focus:outline-none focus:ring-0 focus:border-burlywood peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="floating_standard"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-burlywood peer-focus:dark:text-burlywood peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Add New Dish Type
                      </label>
                    </div>

                    <button
                      className="bg-burlywood text-customGray px-6 mt-3 w-full py-2 rounded"
                      type="button"
                      onClick={handleAddDishType}
                    >
                      Add Dish Type
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between">
                    <h2 className="text-2xl text-burlywood font-semibold mb-4">
                      Preview
                    </h2>
                    <div
                      className="flex mb-3"
                      style={{ display: previouscustdata ? "flex" : "none" }}
                    >
                      <button
                        className=" mx-2  flex items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => {
                          setpreviouscustdata(false);
                          setupdatemode(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="mx-2 lucide lucide-pencil"
                        >
                          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                          <path d="m15 5 4 4" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="flex items-center rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={menuDelete}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className=" mx-2 lucide lucide-trash-2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                  {/* {BlackSiding ? (
              <BlackTheme menuData={dataRestro} dishesByType={dishesByType} />
            ) : null} */}
                  {ThemeComponent ? (
                    ThemeComponent === `${API_BASE_URL}/public/BlackTheme` ? (
                      <BlackTheme
                        menuData={dataRestro}
                        dishesByType={dishesByType}
                      />
                    ) : ThemeComponent === `${API_BASE_URL}/public/Theme2` ? (
                      <Theme2
                        menuData={dataRestro}
                        dishesByType={dishesByType}
                      />
                    ) : ThemeComponent === `${API_BASE_URL}/public/Theme3` ? (
                      <Theme3
                        menuData={dataRestro}
                        dishesByType={dishesByType}
                      />
                    ) : ThemeComponent === `${API_BASE_URL}/public/Theme4` ? (
                      <Theme4
                        menuData={dataRestro}
                        dishesByType={dishesByType}
                      />
                    ) : ThemeComponent === `${API_BASE_URL}/public/Theme5` ? (
                      <Theme5
                        menuData={dataRestro}
                        dishesByType={dishesByType}
                      />
                    ) : null
                  ) : null}
                </div>
              </div>
              <div
                className="text-center"
                style={{ display: previouscustdata ? "none" : "block" }}
              >
                <button
                  className="bg-blue-500 w-full text-white px-6 py-2 rounded"
                  style={{
                    display: dataRestro.dishmenuTemplete ? "block" : "none",
                  }}
                  onClick={updatemode ? updatemenucard : handleSubmit}
                >
                  {updatemode ? "Update Details" : "Save Details"}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="expire w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-4 text-3xl font-bold text-center text-gray-900 dark:text-white">
                Sorry for the inconvenience!
              </h5>
              <p className="mb-6 text-base font-normal text-center text-gray-700 dark:text-gray-400">
                Your subscription has ended. To renew your subscription, please
                contact your service provider.
              </p>
              <a
                href="#"
                className="block w-full text-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Contact Service Provider
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
