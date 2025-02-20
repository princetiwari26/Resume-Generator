import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaSave, FaEdit, FaTrash } from "react-icons/fa";

const Projects = ({ resumeData, uniqueId, fetchResumeData }) => {
    const [popup, setPopup] = useState(false);
    const [projectData, setProjectData] = useState({
        title: "",
        link: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const [editingProjectId, setEditingProjectId] = useState(null);



    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingProjectId) {
                await axios.put("http://localhost:8000/api/resumes/projects/edit", {
                    uniqueId,
                    projectId: editingProjectId,
                    updatedProject: projectData,
                });
            } else {
                await axios.post("http://localhost:8000/api/resumes/projects/add", {
                    uniqueId,
                    project: projectData,
                });
            }
            fetchResumeData()
            setPopup(false);
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await axios.delete("http://localhost:8000/api/resumes/projects/delete", {
                data: { uniqueId, projectId },
            });
            fetchResumeData()
            alert("Project deleted Successfully")
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const openEditPopup = (project) => {
        setProjectData(project);
        setEditingProjectId(project._id);
        setPopup(true);
    };

    const resetForm = () => {
        setProjectData({
            title: "",
            link: "",
            startDate: "",
            endDate: "",
            description: "",
        });
        setEditingProjectId(null);
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:max-w-6xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row mx-4 mt-5">
                <div className="md:w-1/5 w-full flex justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                </div>
                <div className="md:w-4/5 w-full mt-4 md:mt-0">
                    <ul>
                        {resumeData.projects.map((project) => (
                            <li key={project._id} className="border p-3 my-2 flex justify-between items-center bg-gray-100 rounded-lg">

                                <div>
                                    <h3 className="text-lg font-bold">{project.title}</h3>
                                    <p className="text-sm text-gray-600">{project.startDate} - {project.endDate}</p>
                                    <p className="text-gray-700">{project.description}</p>
                                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold">View</a>}
                                </div>
                                <div className="flex space-x-3 text-xl">
                                    <button onClick={() => openEditPopup(project)} className="text-green-600"><FaEdit /></button>
                                    <button onClick={() => handleDelete(project._id)} className="text-red-500"><FaTrash /></button>
                                </div>

                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setPopup(true)}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Projects
                        </button>
                    </div>
                </div>

                {popup && (
                    <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-2xl font-bold text-center mb-4">{editingProjectId ? "Edit Project" : "Add Project"}</h3>
                            <form onSubmit={handleSave} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={projectData.title}
                                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Project Link (Optional)"
                                    value={projectData.link}
                                    onChange={(e) => setProjectData({ ...projectData, link: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />

                                <div className="flex space-x-2">
                                    {/* Start Year */}
                                    <div className="w-40">
                                        <label className="block text-sm font-medium text-gray-700">Start Year</label>
                                        <input
                                            type="month"
                                            value={projectData.startDate}
                                            onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    {/* End Year */}
                                    <div className="w-40">
                                        <label className="block text-sm font-medium text-gray-700">End Year</label>
                                        <input
                                            type="month"
                                            value={projectData.endDate}
                                            onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <textarea
                                    placeholder="Project Description"
                                    value={projectData.description}
                                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                    className="w-full border p-2 rounded"
                                    required
                                ></textarea>

                                {/* Buttons */}
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setPopup(false)}
                                        className="flex items-center bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all duration-300"
                                    >
                                        <FaTimes className="mr-2" /> Cancel
                                    </button>
                                    <button
                                        type="submit"
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
    );
};

export default Projects;