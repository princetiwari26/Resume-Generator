import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const WorkExperience = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([]); // ✅ Store work experiences locally
  const [formData, setFormData] = useState({
    type: "Internship",
    profile: "",
    organization: "",
    location: "",
    startYear: "",
    endYear: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Load work experience from resumeData when the component mounts
  useEffect(() => {
    if (resumeData?.workExperience) {
      setWorkExperiences(resumeData.workExperience);
    }
  }, [resumeData]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Save (Add or Edit)
  const handleSave = async () => {
    if (!uniqueId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      let updatedWorkExperiences;

      if (editingId) {
        // Editing an existing work experience
        await axios.put(`http://localhost:8000/api/resumes/work-experience/${uniqueId}/${editingId}`, formData);
        updatedWorkExperiences = workExperiences.map((work) =>
          work._id === editingId ? { ...work, ...formData } : work
        );
      } else {
        // Adding new work experience
        const { data } = await axios.post("http://localhost:8000/api/resumes/work-experience/add", {
          uniqueId,
          workExperience: formData,
        });
        updatedWorkExperiences = [...workExperiences, data]; // ✅ Add new data to UI instantly
      }

      setWorkExperiences(updatedWorkExperiences); // ✅ Update state immediately
      setPopup(false);
      setEditingId(null);
      fetchResumeData();
      setFormData({ type: "Internship", profile: "", organization: "", location: "", startYear: "", endYear: "" });
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      alert("Failed to save work experience.");
    }
  };

  // ✅ Handle Edit
  const handleEdit = (work) => {
    setEditingId(work._id);
    setFormData(work);
    setPopup(true);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/resumes/work-experience/${uniqueId}/${id}`);
      setWorkExperiences(workExperiences.filter((work) => work._id !== id)); // ✅ Remove from UI instantly
    } catch (error) {
      console.error("Error deleting data:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
        </div>

        <div className="md:w-4/5 w-full mt-4 md:mt-0">

          {/* ✅ Display work experiences instantly */}
          <div>
            <ul>
              {workExperiences.map((work) => (
                <div key={work._id} className="mb-3 border-b pb-2 relative flex items-center">
                  <div>
                    <h1 className="text-lg font-bold">
                      {work.profile}{" "}
                      <span className="text-[10px] text-gray-500 font-semibold italic">{work.type}</span>
                    </h1>
                    <p className="text-sm text-gray-600">{work.organization}</p>
                    <p className="text-sm text-gray-500">{work.startYear} - {work.endYear}</p>
                  </div>
                  <div className="flex space-x-3 text-xl absolute right-0">
                    <button onClick={() => handleEdit(work)} className="text-blue-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(work._id)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setPopup(true)}
                className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FaPlus className="mr-2" /> Add Work Experience
              </button>
            </div>
          </div>

          {/* ✅ Popup for Adding/Editing Work Experience */}
          {popup && (
            <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 flex items-center justify-center bg-opacity-50">
              <div className="space-y-3 bg-white p-4 rounded-lg w-96">
                <h3 className="text-3xl text-center">Work Experience</h3>

                <label className="font-bold text-gray-700">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="Internship">Internship</option>
                  <option value="Job">Job</option>
                </select>

                <label className="font-bold text-gray-700">Profile</label>
                <input type="text" name="profile" value={formData.profile} onChange={handleChange} className="w-full p-2 border rounded-md" />

                <label className="font-bold text-gray-700">Organization</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleChange} className="w-full p-2 border rounded-md" />

                <label className="font-bold text-gray-700">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded-md" />

                <div className="flex space-x-2">
                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700">Start Year</label>
                    <input
                      type="month"
                      name="startYear"
                      value={formData.startYear}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="w-40">
                    <label className="block text-sm font-medium text-gray-700">End Year</label>
                    <input
                      type="month"
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button onClick={() => setPopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                  <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default WorkExperience;