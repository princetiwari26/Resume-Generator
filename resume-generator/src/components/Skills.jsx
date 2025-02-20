import React, { useEffect, useState } from "react";
import { FaTimes, FaSave, FaPlus } from "react-icons/fa";
import axios from "axios";

const Skills = ({ resumeData, uniqueId, fetchResumeData }) => {
    const [popup, setPopup] = useState(false);
    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (resumeData.skills) {
            setSkills(resumeData.skills);
        }
    }, [resumeData]);

    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            const newSkill = inputValue.trim();
            const updatedSkills = [...skills, newSkill];
            setSkills(updatedSkills);
            setInputValue("");

            try {
                await axios.post("http://localhost:8000/api/resumes/skills/add", { uniqueId, skills: updatedSkills });
                fetchResumeData()
            } catch (error) {
                console.error("Error adding skill:", error);
            }
        }
    };

    const handleDelete = async (skillToDelete) => {
        const updatedSkills = skills.filter(skill => skill !== skillToDelete);
        try {
            await axios.delete("http://localhost:8000/api/resumes/skills/delete", { data: { uniqueId, skill: skillToDelete } });
            fetchResumeData()
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
                <div className="md:w-1/5 w-full flex justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                </div>

                <div className="md:w-4/5 w-full mt-4 md:mt-0">
                    <div className="flex flex-wrap">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="relative group px-4 py-1 border-2 rounded-full m-2 bg-gray-100 text-gray-800 font-semibold cursor-pointer hover:bg-red-200 transition"
                            >
                                {skill}
                                <FaTimes
                                    className="absolute -top-2 -right-2 text-red-500 hidden group-hover:block cursor-pointer"
                                    onClick={() => handleDelete(skill)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setPopup(true)}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Skills
                        </button>
                    </div>

                    {popup && (
                        <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 flex items-center justify-center bg-opacity-50">
                            <div>
                                <form className="space-y-3 bg-white p-4 rounded-lg">
                                    <h3 className="text-3xl text-center">Add Skills</h3>
                                    <input
                                        type="text"
                                        placeholder="Type skill and press Enter"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full px-4 py-2 border rounded-md"
                                    />

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
                                            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                                            onClick={() => setPopup(false)}
                                        >
                                            <FaSave className="mr-2" /> Done
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

export default Skills;