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
  const [message, setMessage] = useState("");
  const [subscription_upto, setSubscription_upto] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  console.log(subscription_upto);

  useEffect(() => {
    if (cookies.token) {
      navigate("/superadmin");
    } else {
      navigate("/");
    }
  }, [cookies.token, removeCookie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/create-restaurant-account`,
        {
          restaurant: restaurant,
          username: email,
          password,
          subscription_upto: subscription_upto,
        }
      );
      setMessage(response.data.message);
      setRestaurant("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("Error creating account: " + error.response.data.message);
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
              restaurant name:
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subscription_upto:
            </label>
            <input
              type="date"
              value={subscription_upto}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSubscription_upto(e.target.value)}
            />
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
