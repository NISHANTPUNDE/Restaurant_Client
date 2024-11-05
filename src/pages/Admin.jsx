import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Admin = () => {
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dishType, setDishType] = useState("");
  const [dishmenuTemplete, setDishmenuTemplete] = useState("");
  const [dishmenuColor, setDishmenuColor] = useState("");
  const [dishesByType, setDishesByType] = useState([]);
  const { restaurant } = useParams();
  const [menuImages, setMenuImages] = useState([]);

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/getmenuimages");
        console.log("API Response:", res.data);
        setMenuImages(res.data.images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMenuImages();
  }, []);

  console.log("img", menuImages);
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
      alert("Please enter a dish type name before adding.");
    }
  };

  const handleRemoveDishType = (index) => {
    const newDishesByType = dishesByType.filter((_, i) => i !== index);
    setDishesByType(newDishesByType);
  };
  console.log(dishesByType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant/add",
        {
          hotelName,
          address,
          phone,
          dishesByType,
          dishmenuTemplete,
          dishmenuColor,
          restaurant,
        }
      );
      alert(response.data.message);
      setHotelName("");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-3xl font-serif from-slate-900 font-bold mb-6 text-center">
        Hello {restaurant} Hotel
      </h1>

      <form>
        {/* Hotel Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Hotel Information
          </h2>
          <div className="grid  md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Hotel Name</label>
              <input
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Hotel Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Address"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Select Menu Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {menuImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setDishmenuTemplete(image)}
                className={`flex flex-col items-center gap-4 cursor-pointer p-2 ${
                  dishmenuTemplete === image
                    ? "border-4 border-blue-500"
                    : "border"
                }`}
              >
                <img src={image} alt="menu" className="w-48 h-48" />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Select Menu Color</h2>
          <div
            style={{ borderColor: `${dishmenuColor}` }}
            class="flex items-center text-2xl w-48 border-4  rounded-lg p-2"
          >
            <input
              type="color"
              id="color-picker"
              class="w-10 h-10 outline-none bg-transparent border-none"
              onChange={(e) => setDishmenuColor(e.target.value)}
            />
            <span id="value" className="ml-1">
              {dishmenuColor}
            </span>
          </div>
        </div>

        {dishesByType.map((dishTypeObj, dishTypeIndex) => (
          <div key={dishTypeIndex} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              {dishTypeObj.dishType || `Dish Type ${dishTypeIndex + 1}`}
            </h2>

            <div className="border rounded-sm p-2 my-2">
              {dishTypeObj.dishes.map((dish, dishIndex) => (
                <div
                  key={dishIndex}
                  className="grid grid-cols-3 items-center gap-2"
                >
                  <div>
                    <label className="block text-sm font-bold mb-2">
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
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
                    />
                  </div>
                  <div>
                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded mt-2"
                      type="button"
                      onClick={() => handleRemoveDish(dishTypeIndex, dishIndex)}
                    >
                      Remove Dish
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-blue-500 text-white px-6 py-2 rounded mt-2"
              type="button"
              onClick={() => handleAddDish(dishTypeIndex)}
            >
              Add Another Dish
            </button>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded mt-2 ml-2"
              type="button"
              onClick={() => handleRemoveDishType(dishTypeIndex)}
            >
              Remove Dish Type
            </button>
          </div>
        ))}

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Dish Type</h2>
          <input
            type="text"
            value={dishType}
            onChange={(e) => setDishType(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
            placeholder="Enter Dish Type (e.g., Noodles, Sushi)"
            required
          />
          <button
            className="bg-green-500 text-white px-6 py-2 rounded"
            type="button"
            onClick={handleAddDishType}
          >
            Add Dish Type
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="max-w-4xl mx-auto bg-white shadow-lg">
            <div className="grid grid-cols-4">
              <div
                style={{
                  backgroundColor: dishmenuColor ? dishmenuColor : "yellow",
                }}
                className="md:p-8 relative"
              >
                <div className="absolute top-1/3 md:top-2/3 transform -rotate-90 text-white text-5xl md:text-7xl font-bold">
                  MENU
                </div>
                <div className="flex flex-col items-center justify-center mt-16 md:mt-32"></div>
              </div>

              <div className="p-8">
                <h1 className="text-5xl font-bold">
                  {hotelName ? hotelName : "Your hotel name"}
                </h1>
                <h2 className="text-2xl font-semibold text-gray-500 mb-2">
                  HOTEL
                </h2>
                <div className="flex items-center mb-6">
                  <span className="text-xl">📞</span>
                  <h3 className="text-xl font-semibold">{phone}</h3>
                </div>

                <div className="mt-6">
                  {dishesByType?.map((item, index) => (
                    <div key={index} className="mt-6">
                      <h3 className="text-xl font-bold bg-yellow-400 px-2 py-1 inline-block mb-2">
                        {item.dishType}
                      </h3>
                      <ul className="flex flex-col">
                        {item.dishes.map((dish, dishIndex) => (
                          <li key={dishIndex} className="flex justify-between">
                            <span>{dish.dishName}</span>
                            <span>
                              <strong>Rs:</strong> {dish.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded"
            onClick={handleSubmit}
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
