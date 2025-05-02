import React, { useState } from "react";
import axios from "axios";
import Button from "./common/Button";

const Summary = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSave = async () => {
    if (!uniqueId || !summary.trim()) return alert("Enter a summary");
    if (summary.length > 300) return alert("Summary cannot exceed 300 characters");

    try {
      await axios.post(
        "http://localhost:8000/api/resumes/summary/add-or-update-summary",
        { uniqueId, summary },
        { headers: { "Content-Type": "application/json" } }
      );
      setPopup(false);
      fetchResumeData();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update summary.");
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full">
          <h2 className="text-xl font-bold text-gray-800">Summary</h2>
        </div>
        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          {resumeData.summary ? (
            <div className="flex justify-between items-start">
              <p className="text-slate-600 font-semibold w-11/12">{resumeData.summary}</p>
              <Button
                variant="edit"
                onClick={() => {
                  setSummary(resumeData.summary);
                  setPopup(true);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-end">
              <Button variant="add" label="Add Summary" onClick={() => setPopup(true)} />
            </div>
          )}

          {popup && (
            <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 bg-opacity-50 flex items-center justify-center z-10">
              <div className="bg-white p-6 rounded-lg w-96 space-y-4">
                <h3 className="text-xl font-bold text-center">Edit Summary</h3>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter summary (max 300 characters)"
                  maxLength={300}
                />
                <p className={`text-sm ${summary.length > 300 ? "text-red-600" : "text-gray-500"}`}>
                  {summary.length} / 300 characters
                </p>
                <div className="flex justify-end space-x-3">
                  <Button variant="cancel" label="Cancel" onClick={() => setPopup(false)} />
                  <Button variant="save" label="Save" onClick={handleSave} />
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