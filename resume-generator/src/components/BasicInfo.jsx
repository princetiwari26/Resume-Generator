import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaCity, FaPlus, FaTimes, FaSave, FaEdit } from "react-icons/fa";

const BasicInfo = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    name: resumeData.name || "",
    email: resumeData.email || "",
    phone: resumeData.phone || "",
    city: resumeData.city || ""
  });

  useEffect(() => {
    setBasicInfo({
      name: resumeData.basicInfo?.name || "",
      email: resumeData.basicInfo?.email || "",
      phone: resumeData.basicInfo?.phone || "",
      city: resumeData.basicInfo?.city || ""
    });
  }, [resumeData]);

  const handleSave = () => {
    const updatedData = {
      ...resumeData,
      basicInfo: {
        name: basicInfo.name,
        email: basicInfo.email,
        phone: basicInfo.phone,
        city: basicInfo.city
      }
    };

    axios
      .post("http://localhost:8000/api/resumes/basic-info/add-or-update", { uniqueId, ...updatedData })
      .then((res) => {
        // console.log("Response from server:", res.data);
        localStorage.setItem("formData", JSON.stringify(updatedData));
        setPopup(false);
        fetchResumeData()
      })
      .catch((err) => console.error("Error saving data:", err));

  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Basic Info</h2>
        </div>

        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          {!resumeData.basicInfo.name ? (
            <div className="flex">
              <button
                onClick={() => setPopup(true)}
                className="flex items-center justify-center bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 w-full md:w-auto transition-all duration-300"
              >
                <FaPlus className="mr-2" /> Add Basic Info
              </button>
              <p className="p-2 ml-2 text-white font-semibold bg-red-600 rounded-xl">Add this first</p>
            </div>
          ) : (
            <div>
              <div
                onClick={() => setPopup(true)}
                className="float-right p-2 text-white rounded-lg cursor-pointer mt-[-50px] md:mt-0"
              >
                <FaEdit className="text-xl text-yellow-500 mx-2 cursor-pointer" />
              </div>
              <div>

                <h1 className="text-3xl font-bold">{resumeData.basicInfo.name || "No Name Provided"}</h1>
                <div className="grid md:flex font-bold text-slate-600 text-sm">
                  <p>{resumeData.basicInfo.email || "No Email Provided"}</p>
                  <p className="md:mx-3">{resumeData.basicInfo.phone || "No Phone Provided"}</p>
                  <p className="md:mx-3">{resumeData.basicInfo.city || "No City Provided"}</p>
                </div>

              </div>
            </div>
          )}

          {popup && (
            <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 flex items-center justify-center bg-opacity-50">
              <div>
                <form className="space-y-3 bg-white p-4 rounded-lg">
                  <h3 className="text-3xl text-center">Basic Info</h3>

                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={basicInfo.email}
                      onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                      className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="md:flex">
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={basicInfo.phone}
                        onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>

                    <div className="relative md:ml-4 mt-3 md:mt-0">
                      <FaCity className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={basicInfo.city}
                        onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setPopup(false)}
                      className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-300"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                    >
                      <FaSave className="mr-2" /> Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;