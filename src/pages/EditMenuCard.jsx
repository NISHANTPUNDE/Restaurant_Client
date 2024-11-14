import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BlackTheme from "../Menu_Card/BlackTheme";
import Theme2 from "../Menu_Card/Theme2";
import Theme3 from "../Menu_Card/Theme3";

const Admin = () => {
  const { restaurant } = useParams();
  const Navigate = useNavigate();
  const [dataRestro, setDataRestro] = useState({
    hotelName: "",
    address: "",
    phone: "",
    dishmenuTemplete: "",
    dishmenuColor: "ffca2a",
  });
  const [dishesByType, setDishesByType] = useState([]);
  const [dishType, setDishType] = useState("");
  const [menuImages, setMenuImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getmenuimages");
        setMenuImages(res.data.images);
      } catch (error) {
        console.error("Error fetching menu images:", error);
      }
    };
    fetchMenuImages();
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/getmenuitem/${restaurant}`
        );
        if (res.data.data.length === 0) {
          alert("Please add menu items first.");
          Navigate(`/admin/${restaurant}`);
        }
        setDataRestro(res.data.data[0]);
        setDishesByType(res.data.data[0].dishesByType);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRestaurant();
  }, [restaurant]);
  console.log(dataRestro);
  console.log(dishesByType);

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
      toast.error("Enter Valid Data.");
    }
  };

  const handleRemoveDishType = (index) => {
    const newDishesByType = dishesByType.filter((_, i) => i !== index);
    setDishesByType(newDishesByType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:3000/api/restaurant/edit",
        {
          dataRestro,
          dishesByType,
          restaurant,
        }
      );
      toast.success(response.data.message);
      // alert(response.data.message);
      setDataRestro({
        hotelName: "",
        address: "",
        phone: "",
        dishmenuTemplete: "",
        dishmenuColor: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong. ");
      // alert("An error occurred. Please check the console for more details.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/restaurant/delete/?restaurant=${restaurant}`
      );
      toast.success(response.data.message);
      // alert(response.data.message);
      Navigate(`/admin/${restaurant}`);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong. ");
      // alert("An error occurred. Please check the console for more details.");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const trimmedFilename = dataRestro.dishmenuTemplete
    .replace("http://localhost:3000/public/", "")
    .replace(/\.[^/.]+$/, "");
  const ThemeComponent = trimmedFilename;
  console.log(ThemeComponent);

  return (
    <>
      <Toaster />
      <nav className="bg-white  border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://deveraa.com/_next/static/media/deveraa.52ebdceb.jpg"
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
                <button
                  onClick={toggleModal}
                  className="block py-2 px-3 text-white bg-blue-700 md:bg-blue-700 md:text-white md:rounded rounded  w-full "
                >
                  View Restaurant
                </button>
              </li>
              <li>
                <button
                  className="block py-2 px-3 text-white bg-blue-700 md:bg-blue-700 md:text-white md:rounded rounded w-full"
                  onClick={handleDelete}
                >
                  delete templete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-2xl font-serif font-semibold mb-4 text-black text-merienda">
                  Hotel Information
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 space-y-4">
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_standard"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_standard"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                      >
                        Phone
                      </label>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="relative z-0">
                  <input
                    type="text"
                    value={dataRestro.address}
                    onChange={(e) =>
                      setDataRestro({ ...dataRestro, address: e.target.value })
                    }
                    id="floating_standard"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_standard"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Address
                  </label>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 border-t dark:border-gray-600">
                <button
                  onClick={toggleModal}
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
                >
                  Save
                </button>
                {/* <button
                  onClick={toggleModal}
                  className="ms-3 bg-white text-gray-900 rounded-lg border border-gray-200 px-5 py-2.5 hover:bg-gray-100"
                >
                  Decline
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-customGray p-6 rounded shadow-md">
        <form>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold font-merienda italic text-burlywood">
              Select Menu Template
            </h2>

            <div className="grid w-full grid-cols-2 md:grid-cols-2 gap-2">
              {menuImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setDataRestro({ ...dataRestro, dishmenuTemplete: image })
                  }
                  className="relative flex flex-col mt-3  shadow-sm border border-slate-200 rounded-lg w-full"
                >
                  <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                    <img
                      src={image}
                      alt="card-image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* menu card desing */}
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
              <span id="value" className=" text-burlywood text-right ml-1">
                {dataRestro.dishmenuColor}
              </span>
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
                  {dishTypeObj.dishType || `Dish Type ${dishTypeIndex + 1}`}
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
                      <div className="relative z-0 my-3">
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
                      <div className="relative z-0 my-3">
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
                        className="bg-orange-500 text-white px-6 py-2 w-full rounded my-2"
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
            <div className="relative z-0">
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

          <div className="mb-6">
            <h2 className="text-2xl text-burlywood font-semibold mb-4">
              Preview
            </h2>
            {/* {BlackSiding ? (
              <BlackTheme menuData={dataRestro} dishesByType={dishesByType} />
            ) : null} */}
            {ThemeComponent ? (
              ThemeComponent === "BlackTheme" ? (
                <BlackTheme menuData={dataRestro} dishesByType={dishesByType} />
              ) : ThemeComponent === "Theme2" ? (
                <Theme2 menuData={dataRestro} dishesByType={dishesByType} />
              ) : ThemeComponent === "Theme3" ? (
                <Theme3 menuData={dataRestro} dishesByType={dishesByType} />
              ) : null
            ) : null}
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 w-full text-white px-6 py-2 rounded"
              onClick={handleSubmit}
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Admin;
