// WorkExperience.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./common/Button";

const WorkExperience = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [formData, setFormData] = useState({
    type: "Internship",
    profile: "",
    organization: "",
    location: "",
    startYear: "",
    endYear: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (resumeData?.workExperience) {
      setWorkExperiences(resumeData.workExperience);
    }
  }, [resumeData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      type: "Internship",
      profile: "",
      organization: "",
      location: "",
      startYear: "",
      endYear: "",
    });
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      let updatedWorkExperiences;
      if (editingId) {
        await axios.put(`http://localhost:8000/api/resumes/work-experience/${uniqueId}/${editingId}`, formData);
        updatedWorkExperiences = workExperiences.map((w) =>
          w._id === editingId ? { ...w, ...formData } : w
        );
      } else {
        const { data } = await axios.post(`http://localhost:8000/api/resumes/work-experience/add`, {
          uniqueId,
          workExperience: formData,
        });
        updatedWorkExperiences = [...workExperiences, data];
      }
      setWorkExperiences(updatedWorkExperiences);
      fetchResumeData();
      setPopup(false);
      resetForm();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/resumes/work-experience/${uniqueId}/${id}`);
      setWorkExperiences(workExperiences.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setPopup(true);
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full flex justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
        </div>
        <div className="md:w-4/5 w-full mt-4 md:mt-0">
          <ul>
            {workExperiences.map((item) => (
              <li key={item._id} className="border p-3 my-2 flex justify-between items-center bg-gray-100 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold">
                    {item.profile} <span className="text-xs italic text-gray-500">{item.type}</span>
                  </h3>
                  <p className="text-sm text-gray-600">{item.organization} – {item.location}</p>
                  <p className="text-sm text-gray-500">{item.startYear} - {item.endYear}</p>
                </div>
                <div className="flex">
                  <Button onClick={() => handleEdit(item)} variant="edit" textColor="text-blue-500" />
                  <Button onClick={() => handleDelete(item._id)} variant="delete" />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <Button variant="add" label="Add WorkExperience" onClick={() => setPopup(true)} />
          </div>
        </div>

        {popup && (
          <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-bold text-center mb-4">{editingId ? "Edit Work Experience" : "Add Work Experience"}</h3>

              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-md mb-2">
                <option value="Internship">Internship</option>
                <option value="Job">Job</option>
              </select>

              <input name="profile" value={formData.profile} onChange={handleChange} placeholder="Profile" className="w-full p-2 border rounded-md mb-2" />
              <input name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" className="w-full p-2 border rounded-md mb-2" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded-md mb-2" />

              <div className="flex space-x-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Start Year</label>
                  <input type="month" name="startYear" value={formData.startYear} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">End Year</label>
                  <input type="month" name="endYear" value={formData.endYear} onChange={handleChange} className="w-full p-2 border rounded-md" />
                </div>
              </div>

              <div className="flex justify-end mt-4 space-x-3">
                <Button onClick={() => { setPopup(false); resetForm(); }} variant="cancel" label="Cancel" />
                <Button onClick={handleSave} variant="save" label="Save" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkExperience;