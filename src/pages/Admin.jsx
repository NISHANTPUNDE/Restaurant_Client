import React, { useState } from "react";

const Admin = () => {
  const [hotelName, setHotelName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dishType, setDishType] = useState("");
  const [dishesByType, setDishesByType] = useState([]);

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
      setDishType(""); // Clear the input after adding the dish type
    } else {
      alert("Please enter a dish type name before adding.");
    }
  };

  const handleRemoveDishType = (index) => {
    const newDishesByType = dishesByType.filter((_, i) => i !== index);
    setDishesByType(newDishesByType);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Restaurant and Menu Management
      </h1>

      <form>
        {/* Hotel Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Hotel Information</h2>
          <div className="grid grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Dish Types and Dishes */}
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

        {/* Add New Dish Type */}
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

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
