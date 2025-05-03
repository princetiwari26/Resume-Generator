import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaCity, FaPlus, FaTimes, FaSave, FaEdit } from "react-icons/fa";
import Button from "./common/Button";

const BasicInfo = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    name: resumeData.name || "",
    phone: resumeData.phone || "",
    email: resumeData.email || "",
    city: resumeData.city || ""
  });

  useEffect(() => {
    setBasicInfo({
      name: resumeData.basicInfo?.name || "",
      phone: resumeData.basicInfo?.phone || "",
      email: resumeData.basicInfo?.email || "",
      city: resumeData.basicInfo?.city || ""
    });
  }, [resumeData]);

  const handleSave = async () => {
    try {
      const updatedData = {
        ...resumeData,
        basicInfo: { ...basicInfo },
      };
      await axios.post("http://localhost:8000/api/resumes/basic-info/add-or-update", {
        uniqueId,
        ...updatedData,
      });
      setPopup(false);
      fetchResumeData();
    } catch (err) {
      console.error("Error saving basic info:", err);
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-8">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Basic Info</h2>
        </div>

        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          {!resumeData.basicInfo?.name ? (
            <div className="flex">
              <div className="flex justify-end">
                <Button
                  variant="add"
                  label="Add Basic Info"
                  onClick={() => setPopup(true)}
                />
              </div>
              <div className="flex">
                <p
                  onClick={() => setPopup(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 rounded-lg flex items-center ml-5"
                >
                  Note - Add this first
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="float-right p-2 mt-[-50px] md:mt-0"
              >
                <Button
                  variant="edit"
                  label="Edit"
                  onClick={() => setPopup(true)}
                  textColor="text-yellow-500"
                />
              </div>
              <div>

                <h1 className="text-3xl font-bold">{resumeData.basicInfo.name || "No Name Provided"}</h1>
                <div className="grid md:flex font-bold text-slate-600 text-sm">
                  <p>{resumeData.basicInfo.phone || "No Phone Number Provided"}</p>
                  <p className="md:ml-5">{resumeData.basicInfo.email || "No Email Provided"}</p>
                  <p className="md:ml-5">{resumeData.basicInfo.city || "No City Provided"}</p>
                </div>

              </div>
            </div>
          )}

          {popup && (
            <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 flex items-center justify-center bg-opacity-50 z-10">
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
                    <Button onClick={() => setPopup(false)} variant="cancel" label="Cancel" />
                    <Button label="Save" onClick={handleSave} variant="save" />
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