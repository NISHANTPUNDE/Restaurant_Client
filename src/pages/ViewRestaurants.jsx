import React, { useState, useEffect } from "react";

const ViewRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/getallrestaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data.data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          List of Restaurants
        </h1>
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {restaurant.restaurant}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Username:</span>{" "}
                  {restaurant.username}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Password:</span>{" "}
                  {restaurant.password}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Subscription Upto:</span>{" "}
                  {new Date(restaurant.subscription_upto).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400">
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(restaurant.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Loading restaurants...
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRestaurants;
