import React, { useState, useEffect } from "react";

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    restaurant: "",
    username: "",
    password: "",
    subscription_upto: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/getallrestaurants")
      .then((response) => response.json())
      .then((data) =>
        setSubscriptions(
          data.data.map((item) => ({
            ...item,
            isActive:
              new Date(item.subscription_upto) >= new Date()
                ? "Active"
                : "Expired",
          }))
        )
      )
      .catch((error) => console.error("Error fetching subscriptions:", error));
  }, []);

  const handleEditClick = (subscription) => {
    setEditing(subscription._id);
    setFormData({
      restaurant: subscription.restaurant,
      username: subscription.username,
      password: subscription.password,
      subscription_upto: subscription.subscription_upto,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (id) => {
    fetch(`http://localhost:3000/api/updatesubscription/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub._id === id
              ? {
                  ...sub,
                  ...formData,
                  isActive:
                    new Date(formData.subscription_upto) >= new Date()
                      ? "Active"
                      : "Expired",
                }
              : sub
          )
        );
        setEditing(null);
      })
      .catch((error) => console.error("Error updating subscription:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manage Subscriptions
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              {editing === subscription._id ? (
                <>
                  <input
                    type="text"
                    name="restaurant"
                    value={formData.restaurant}
                    onChange={handleInputChange}
                    placeholder="Restaurant Name"
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="email"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="date"
                    name="subscription_upto"
                    value={formData.subscription_upto.split("T")[0]}
                    onChange={handleInputChange}
                    className="block w-full mb-4 p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => handleSave(subscription._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {subscription.restaurant}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Email:</span>{" "}
                    {subscription.username}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Password:</span>{" "}
                    {subscription.password}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Subscription:</span>{" "}
                    {new Date(
                      subscription.subscription_upto
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium text-gray-800 mb-3">
                    Status:{" "}
                    <span
                      className={`${
                        subscription.isActive === "Active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {subscription.isActive}
                    </span>
                  </p>
                  <button
                    onClick={() => handleEditClick(subscription)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
