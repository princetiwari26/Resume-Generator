import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { indianBoards, educationLevels, months, years } from "../DropDown/DropDownOptions";

const Education = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [formData, setFormData] = useState({
    educationLevel: "",
    school: "",
    board: "",
    stream: "",
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });
  const [editId, setEditId] = useState(null);
  const [selectedOption, setSelectedOption] = useState("school");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!uniqueId) return;

    try {
      let response;
      if (editId) {
        response = await axios.put(`http://localhost:8000/api/resumes/update-education/${uniqueId}/${editId}`, formData);
      } else {
        response = await axios.post(`http://localhost:8000/api/resumes/add-education/add`, {
          uniqueId,
          education: formData,
        });
      }

      setPopup(false);
      setEditId(null);
      fetchResumeData()
      setFormData({ educationLevel: "", school: "", board: "", stream: "", degree: "", startMonth: "", startYear: "", endMonth: "", endYear: "" });
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!uniqueId) return;
    try {
      await axios.delete(`http://localhost:8000/api/resumes/delete-education/${uniqueId}/${id}`);
      alert("Data is deleted!!!")
      fetchResumeData()
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Education</h2>
        </div>
        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          <ul>
            {resumeData.education.map((edu) => (
              <li key={edu._id} className="border p-3 my-2 flex justify-between items-center bg-gray-100 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">{edu.degree || edu.school}, <span>{edu.stream}</span></h3>
                  <div className="grid font-bold text-slate-600 text-sm">
                    <p>{edu.school || edu.college}</p>
                    <p>{edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}</p>
                  </div>
                </div>
                <div className="flex space-x-2 text-xl">
                  <FaEdit
                    onClick={() => {
                      setFormData(edu);
                      setEditId(edu._id);
                      setPopup(true);
                    }}
                    className="text-yellow-500 mx-2 cursor-pointer"
                  />
                  <FaTrash onClick={() => handleDelete(edu._id)} className="text-red-500 cursor-pointer" />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setPopup(true)}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> Add Education
            </button>
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 flex items-center justify-center bg-opacity-50">
          <div className="space-y-4 bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl text-center font-semibold">Education</h3>

            <div className="flex">
              <button onClick={() => setSelectedOption("school")} className={`flex-1 py-2 font-semibold ${selectedOption === "school" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"} rounded-l-md`}>School</button>
              <button onClick={() => setSelectedOption("college")} className={`flex-1 py-2 font-semibold ${selectedOption === "college" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"} rounded-r-md`}>College</button>
            </div>

            <form className="space-y-3">
              {selectedOption === "school" ? (
                <>
                  <select value={formData.educationLevel} onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Education Level</option>
                    {educationLevels.map((level, index) => (
                      <option key={index} value={level}>{level}</option>
                    ))}
                  </select>
                  <input type="text" placeholder="School Name" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                  <select value={formData.board} onChange={(e) => setFormData({ ...formData, board: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Board</option>
                    {indianBoards.map((board, index) => (
                      <option key={index} value={board}>{board}</option>
                    ))}
                  </select>
                  {formData.educationLevel === "Senior Secondary (12th)" && (
                    <input type="text" placeholder="Stream" value={formData.stream} onChange={(e) => setFormData({ ...formData, stream: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                  )}
                </>
              ) : (
                <>
                  <input type="text" placeholder="College Name" value={formData.school} onChange={(e) => setFormData({ ...formData, school: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="Degree" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                  <input type="text" placeholder="Stream" value={formData.stream} onChange={(e) => setFormData({ ...formData, stream: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" />
                </>
              )}

              <div className="flex space-x-2">
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700">Start Year</label>
                  <input
                    type="month"
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700">End Year</label>
                  <input
                    type="month"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setPopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Education;