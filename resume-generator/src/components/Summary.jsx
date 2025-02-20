import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaSave, FaEdit } from "react-icons/fa";

const Summary = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [summary, setSummary] = useState("");
  const [popup, setPopup] = useState(false);

  const handleSummaryUpdate = async () => {
    if (!uniqueId) return alert("Unique ID is missing!");
    if (!summary.trim()) return alert("Enter a summary first");

    try {
      await axios.post(
        "http://localhost:8000/api/resumes/summary/add-or-update-summary",
        { uniqueId: uniqueId, summary },
        { headers: { "Content-Type": "application/json" } }
      );

      setPopup(false);
      fetchResumeData();
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Failed to update summary. Check console for details.");
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Summary</h2>
        </div>

        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          {resumeData.summary ? (
            <div>
              <div
                onClick={() => {
                  setSummary(resumeData.summary || "");
                  setPopup(true);
                }}
                className="float-right p-2 cursor-pointer ml-4"
              >
                <FaEdit className="text-xl text-pink-600 mx-2 cursor-pointer" />
              </div>
              <div className="grid md:flex font-semibold text-slate-600 text-sm">
                <p>{resumeData.summary}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setSummary("");
                  setPopup(true);
                }}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" /> Add Summary
              </button>
            </div>
          )}

          {popup && (
            <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 flex items-center justify-center bg-opacity-50">
              <div className="space-y-3 bg-white p-4 rounded-lg w-[400px]">
                <h3 className="text-2xl font-bold text-center">Summary / Overview</h3>
                <div className="grid space-y-2">
                  <label className="ml-1 font-bold text-gray-700">Summary</label>
                  <textarea
                    placeholder="Enter Summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  ></textarea>
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
                    onClick={handleSummaryUpdate}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                  >
                    <FaSave className="mr-2" /> Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;