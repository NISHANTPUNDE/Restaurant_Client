import React, { useState, useEffect } from "react";

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    restaurant: "",
    username: "",
    password: "",
    subscription_upto: "",
    subscription_start: "", // Subscription start date
    phone: "", // Phone number
    agent: "", // Agent name
    subscription_plan: "", // Subscription plan
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
  console.log("subscriptions", subscriptions);

  const handleEditClick = (subscription) => {
    setEditing(subscription._id);
    setFormData({
      restaurant: subscription.restaurant,
      username: subscription.username,
      password: subscription.password,
      subscription_upto: subscription.subscription_upto,
      subscription_start: subscription.subscription_start, // Added start date
      phone: subscription.phone, // Added phone number
      agent: subscription.agent, // Added agent name
      subscription_plan: subscription.subscription_plan, // Added plan
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
    window.location.reload();
  };

  const handleDelete = (subscription) => {
    fetch(`http://localhost:3000/api/deletesubscription/${subscription._id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSubscriptions((prev) =>
          prev.filter((sub) => sub._id !== subscription._id)
        );
      })
      .catch((error) => console.error("Error deleting subscription:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manage Subscriptions
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left text-gray-600">
                  Restaurant
                </th>
                <th className="py-3 px-6 text-left text-gray-600">Email</th>
                <th className="py-3 px-6 text-left text-gray-600 hidden md:table-cell">
                  Password
                </th>
                <th className="py-3 px-6 text-left text-gray-600">Phone</th>
                <th className="py-3 px-6 text-left text-gray-600">Agent</th>
                <th className="py-3 px-6 text-left text-gray-600">
                  Subscription Plan
                </th>
                <th className="py-3 px-6 text-left text-gray-600">
                  Subscription Start
                </th>
                <th className="py-3 px-6 text-left text-gray-600">
                  Subscription End
                </th>
                <th className="py-3 px-6 text-left text-gray-600 hidden md:table-cell">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription._id} className="border-t border-gray-200">
                  {editing === subscription._id ? (
                    <>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="restaurant"
                          value={formData.restaurant}
                          onChange={handleInputChange}
                          placeholder="Restaurant Name"
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="email"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6 hidden md:table-cell">
                        <input
                          type="text"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Password"
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="text"
                          name="agent"
                          value={formData.agent}
                          onChange={handleInputChange}
                          placeholder="Agent Name"
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <select
                          name="subscription_plan"
                          value={formData.subscription_plan}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="1-month">1 Month</option>
                          <option value="6-months">6 Months</option>
                          <option value="1-year">1 Year</option>
                        </select>
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="date"
                          name="subscription_start"
                          value={formData.subscription_start.split("T")[0]}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="date"
                          name="subscription_upto"
                          value={formData.subscription_upto.split("T")[0]}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="py-3 px-6"></td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleSave(subscription._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-6">{subscription.restaurant}</td>
                      <td className="py-3 px-6">{subscription.username}</td>
                      <td className="py-3 px-6 hidden md:table-cell">
                        ******
                      </td>{" "}
                      {/* Hide password */}
                      <td className="py-3 px-6">{subscription.phone}</td>
                      <td className="py-3 px-6">{subscription.agent}</td>
                      <td className="py-3 px-6">
                        {subscription.subscription_plan}
                      </td>
                      <td className="py-3 px-6">
                        {new Date(
                          subscription.subscription_start
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">
                        {new Date(
                          subscription.subscription_upto
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">{subscription.isActive}</td>
                      <td className="py-3 px-6 flex">
                        <button
                          onClick={() => handleEditClick(subscription)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(subscription)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
