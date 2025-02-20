import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaTrash, FaSave, FaPlusCircle } from "react-icons/fa";
// import Button from "./buttons/Button"; // Import the Button component

const Links = ({ resumeData, uniqueId, fetchResumeData }) => {
    const [popup, setPopup] = useState(false);
    const [website, setWebsite] = useState("");
    const [url, setUrl] = useState("");
    const [links, setLinks] = useState(resumeData?.links || []);
    const [domainList] = useState([
        "GitHub",
        "LinkedIn",
        "Portfolio",
        "Resume",
        "Dev.to",
        "Stack Overflow",
        "Dribbble",
        "CodePen",
        "LeetCode",
        "HackerRank",
    ]);

    useEffect(() => {
        setLinks(resumeData?.links || []);
    }, [resumeData]);

    const handleAddLink = async (e) => {
        e.preventDefault();
        if (!website || !url) return;

        try {
            const response = await axios.post("http://localhost:8000/api/resumes/links/add", {
                uniqueId,
                website,
                url,
            });
            fetchResumeData()
            setLinks(response.data.links);
            setPopup(false);
            setWebsite("");
            setUrl("");
        } catch (error) {
            console.error("Error adding link:", error);
        }
    };

    const handleDeleteLink = async (linkId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/resumes/links/${uniqueId}/${linkId}`);
            setLinks(response.data.links);
            fetchResumeData();
        } catch (error) {
            console.error("Error deleting link:", error);
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
                <div className="md:w-1/5 w-full flex justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-gray-800">Links</h2>
                </div>

                <div className="md:w-4/5 w-full mt-4 md:mt-0">
                    <div className="space-y-4">
                        {links.map((link) => (
                            <div key={link._id} className="grid relative group">
                                <p className="font-semibold">{link.website}</p>
                                <a href={link.url} className="text-sky-600">
                                    {link.url}
                                </a>
                                <FaTrash
                                    onClick={() => handleDeleteLink(link._id)}
                                    className="absolute right-0 top-1 text-xl text-red-500 cursor-pointer"
                                />
                            </div>
                        ))}

                        {/* Add / Add More Button */}
                        {/* <Button
              onClick={() => setPopup(true)}
              label={links.length > 0 ? "Add More" : "Add"}
              icon={links.length > 0 ? FaPlusCircle : FaPlus}
              color={links.length > 0 ? "purple" : "green"}
              className="float-right text-lg"
            /> */}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setPopup(true)}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Links
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {popup && (
                <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-96">
                        <h3 className="text-2xl text-center mb-4">Add Link</h3>
                        <form onSubmit={handleAddLink} className="space-y-3">
                            <div className="relative">
                                <label>Select Website</label>
                                <select
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    className="w-full p-2 border mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <option value="">Choose a site</option>
                                    {domainList.map((domain) => (
                                        <option key={domain} value={domain}>
                                            {domain}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <label>Enter URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full p-2 border mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* <div className="flex justify-end space-x-3">
                <Button onClick={() => setPopup(false)} label="Cancel" icon={FaTimes} color="gray" />
                <Button type="submit" label="Save" icon={FaSave} color="green" />
              </div> */}
                            <div className="flex justify-end space-x-3">
                                <button onClick={() => setPopup(false)} className="bg-gray-400 px-4 py-2 text-white rounded-md"><FaTimes /> Cancel</button>
                                <button onClick={handleAddLink} className="bg-green-500 px-4 py-2 text-white rounded-md"><FaSave /> Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Links;