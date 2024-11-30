import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/superadmin/Navbar";
import { API_BASE_URL } from "../config/config";

const Notifications = () => {
  const [expiringSubscriptions, setExpiringSubscriptions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchExpiringSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/expiring-subscriptions?days=365`
        );

        // Filter for subscriptions expiring in 5 days or fewer
        const currentDate = new Date();
        const filteredSubscriptions = response.data.data.filter((item) => {
          const subscriptionEnd = new Date(item.subscription_upto);
          const daysRemaining =
            (subscriptionEnd - currentDate) / (1000 * 60 * 60 * 24); // Convert ms to days
          return daysRemaining > 0 && daysRemaining <= 5; // Within 5 days
        });

        setExpiringSubscriptions(filteredSubscriptions);
      } catch (error) {
        setMessage(
          "Failed to fetch notifications: " +
            (error.response?.data?.message || error.message)
        );
      }
    };

    fetchExpiringSubscriptions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Expiring Subscriptions
        </h2>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Subscription End
                </th>
              </tr>
            </thead>
            <tbody>
              {expiringSubscriptions.map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.restaurant}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {new Date(item.subscription_upto).toLocaleDateString()}
                          </span>
                    {/* {new Date(item.subscription_upto).toLocaleDateString()} */}
                  </td>
                </tr>
              ))}
              {expiringSubscriptions.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No subscriptions expiring in the next 5 days.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Notifications;
