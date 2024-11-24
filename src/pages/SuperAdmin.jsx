import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config";
import Navbar from "../components/superadmin/Navbar";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agent, setAgent] = useState("");
  const [message, setMessage] = useState("");
  const [plan, setPlan] = useState("1-month"); // Default plan
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    // Redirect based on token existence
    if (!cookies.token) {
      navigate("/");
    }
  }, [cookies.token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Calculate subscription expiration date
    const today = new Date();
    let subscription_upto = new Date(today);

    if (plan === "1-month")
      subscription_upto.setMonth(subscription_upto.getMonth() + 1);
    if (plan === "2-month")
      subscription_upto.setMonth(subscription_upto.getMonth() + 2);
    if (plan === "3-month")
      subscription_upto.setMonth(subscription_upto.getMonth() + 3);
    if (plan === "6-month")
      subscription_upto.setMonth(subscription_upto.getMonth() + 6);
    if (plan === "1-year")
      subscription_upto.setFullYear(subscription_upto.getFullYear() + 1);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/create-restaurant-account`,
        {
          restaurant,
          username: email,
          password,
          phone,
          agent,
          subscription_upto: subscription_upto.toISOString(),
          subscription_plan: plan,
        }
      );
      setMessage(response.data.message);
      // Reset form fields
      setRestaurant("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAgent("");
      setPlan("1-month");
    } catch (error) {
      setMessage(
        "Error creating account: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Create Restaurant Account</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Restaurant Name:
            </label>
            <input
              type="text"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone No:
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Agent Name:
            </label>
            <input
              type="text"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subscription Plan:
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              required
              className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1-month">1 Month</option>
              <option value="3-month">3 Months</option>
              <option value="6-month">6 Months</option>
              <option value="1-year">1 Year</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Create Account
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </>
  );
};

export default SuperAdmin;
