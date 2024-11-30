import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/config";
import { IoMdDownload } from "react-icons/io";
import QRCode from "qrcode";

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchinput, setsearchinput] = useState("");
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
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  // useEffect(() => {
  //   console.log("searchinput",searchinput)
  // }, [searchinput]);
  // Update filteredSubscriptions when searchInput or subscriptions change
  useEffect(() => {
    
    const filteredData = subscriptions.filter((item) =>
      item.restaurant.toLowerCase().includes(searchinput.toLowerCase()) ||
    item.username.toLowerCase().includes(searchinput.toLowerCase()) ||
    item.agent.toLowerCase().includes(searchinput.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchinput.toLowerCase()) ||
    item.subscription_plan.toLowerCase().includes(searchinput.toLowerCase())||
    item.isActive.toLowerCase().includes(searchinput.toLowerCase())
    
    );
    setFilteredSubscriptions(filteredData);
  }, [searchinput, subscriptions]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/getallrestaurants`)
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
  // console.log("subscriptions", subscriptions);

  const handleEditClick = (subscription) => {
    setIsModalOpen(true);
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

  // update resto
  const handleSave = (e, id) => {
    e.preventDefault();
    console.log("formData", formData);
    fetch(`${API_BASE_URL}/api/updatesubscription/${id}`, {
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
      });
    Swal.fire({
      title: "Update !",
      text: `Update Successfully `,
      icon: "success",
    }).catch((error) => console.error("Error updating subscription:", error));
    // window.location.reload();
  };

  const handleDelete = (subscription) => {
    console.log("subscription", subscription.restaurant);
    Swal.fire({
      title: `Do you Really want to Delete the ${subscription.restaurant} ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteResto(subscription);
      } else if (result.isDenied) {
        Swal.fire(`${subscription.restaurant} was not delete`, "", "info");
      }
    });
    //
  };

  const DeleteResto = (subscription) => {
    fetch(`${API_BASE_URL}/api/delete-restaurant/${subscription._id}`, {
      method: "DELETE",
    })
      .then(() => {
        setSubscriptions((prev) =>
          prev.filter((sub) => sub._id !== subscription._id)
        );
        Swal.fire({
          title: "Delete !",
          text: `${subscription.restaurant}  was Delete `,
          icon: "success",
        });
      })
      .catch((error) => console.error("Error deleting subscription:", error));
  };

  console.log("searchinput", searchinput);

  const genrateQR = async (restoname) => {
    try {
      const encodedName = encodeURIComponent(restoname); // Encode restaurant name
      const qrURL = `http://localhost:5173/${encodedName}`; // Generate QR URL
      const qrDataURL = await QRCode.toDataURL(qrURL); // Generate QR code as Data URL

      // Create a download link for the QR code
      const link = document.createElement("a");
      link.href = qrDataURL;
      link.download = `${restoname}.png`; // Download name
      link.click();

      console.log("QR Code Generated and Downloaded:", restoname);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Hide the modal
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Manage Subscriptions
          </h1>
          <form className="w-[50%] ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search..."
                required=""
                onChange={(e) => setsearchinput(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
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
                <th className="py-3 px-6 text-left text-gray-600">
                  Genrate QR
                </th>
                <th className="py-3 px-6 text-left text-gray-600 hidden md:table-cell">
                  Status
                </th>
                <th className="py-3 px-6 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription._id} className="border-t border-gray-200">
                  {editing === subscription._id ? (
                    <>
                      {/* Main modal */}
                      {isModalOpen && (
                        <div
                          id="authentication-modal"
                          tabIndex={-1}
                          aria-hidden="true"
                          className="flex justify-center items-center fixed inset-0 z-50 w-full h-screen bg-black bg-opacity-50"
                        >
                          <div className="relative p-4 w-full max-w-2xl">
                            {/* Modal content */}
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              {/* Modal header */}
                              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  Update {formData.restaurant}
                                </h3>
                                <button
                                  type="button"
                                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  data-modal-hide="authentication-modal"
                                  //  onClick={()=>setIsModalOpen(false)}
                                  onClick={() => closeModal()}
                                >
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
                                  <span className="sr-only">Close modal</span>
                                </button>
                              </div>
                              {/* Modal body */}
                              <div className="p-4 md:p-5">
                                <form className="space-y-4" action="#">
                                  {/* Grid layout for fields */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor="restaurant"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Restaurant Name
                                      </label>
                                      <input
                                        type="text"
                                        name="restaurant"
                                        value={formData.restaurant}
                                        onChange={handleInputChange}
                                        placeholder="Restaurant Name"
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Email
                                      </label>
                                      <input
                                        type="email"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Password
                                      </label>
                                      <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="phone"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Phone Number
                                      </label>
                                      <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="agent"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Agent
                                      </label>
                                      <input
                                        type="text"
                                        name="agent"
                                        value={formData.agent}
                                        onChange={handleInputChange}
                                        placeholder="Agent Name"
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="subscription_plan"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Subscription Plan
                                      </label>
                                      <select
                                        name="subscription_plan"
                                        value={formData.subscription_plan}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      >
                                        <option value="1-month">1 Month</option>
                                        <option value="3-month">
                                          3 Months
                                        </option>
                                        <option value="6-month">
                                          6 Months
                                        </option>
                                        <option value="1-year">1 Year</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="subscription_start"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Subscription Start
                                      </label>
                                      <input
                                        type="date"
                                        name="subscription_start"
                                        value={
                                          formData.subscription_start.split(
                                            "T"
                                          )[0]
                                        }
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="subscription_upto"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Subscription End
                                      </label>
                                      <input
                                        type="date"
                                        name="subscription_upto"
                                        value={
                                          formData.subscription_upto.split(
                                            "T"
                                          )[0]
                                        }
                                        onChange={handleInputChange}
                                        className="block w-full p-2 border border-gray-300 rounded"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    onClick={(e) =>
                                      handleSave(e, subscription._id)
                                    }
                                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                  >
                                    Update
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                      <td className="py-3 px-6">
                        {/* QR */}
                        <div
                          className="w-auto p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-center"
                          onClick={() => genrateQR(subscription.restaurant)}
                        >
                          <IoMdDownload size={24} />
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        {subscription.isActive === "Active" ? (
                          <span class="inline-flex items-center rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {subscription.isActive}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {subscription.isActive}
                          </span>
                        )}
                      </td>
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
