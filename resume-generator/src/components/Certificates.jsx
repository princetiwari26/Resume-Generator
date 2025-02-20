import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaSave, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const Certificates = ({ resumeData, uniqueId, fetchResumeData }) => {
    const [popup, setPopup] = useState(false);
    const [editing, setEditing] = useState(null);
    const [certificateData, setCertificateData] = useState({ title: "", provider: "", date: "" });
    const [certificates, setCertificates] = useState(resumeData?.certificates || [])

    useEffect(() => {
        setCertificates(resumeData?.certificates || [])
    }, [resumeData])

    const handleSave = async () => {
        try {
            if (editing) {
                const response = await axios.put("http://localhost:8000/api/resumes/certificates/edit", { uniqueId, certificateId: editing, ...certificateData });
                setCertificates(response.data.certificates)
            } else {
                const response = await axios.post("http://localhost:8000/api/resumes/certificates/add", { uniqueId, ...certificateData });
                setCertificates(response.data.certificates)
            }
            fetchResumeData()
            setPopup(false);
            setEditing(null);
            setCertificateData({ title: "", provider: "", date: "" });
        } catch (error) {
            console.error("Error saving certificate:", error);
        }
    };

    const handleEdit = (cert) => {
        setCertificateData(cert);
        setEditing(cert._id);
        setPopup(true);
    };

    const handleDelete = async (certificateId) => {
        try {
            await axios.delete("http://localhost:8000/api/resumes/certificates/delete", { data: { uniqueId, certificateId } });
            fetchResumeData();
            alert("Certificates is deleted!!!")
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
                <div className="md:w-1/5 w-full flex justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-gray-800">Certificates</h2>
                </div>

                <div className="md:w-4/5 w-full mt-4 md:mt-0">
                    <div className="space-y-4">
                        {resumeData.certificates.map((cert) => (
                            <div key={cert._id} className="p-4 border rounded-md flex justify-between items-center">
                                <div>
                                    <h1 className="text-lg font-bold">{cert.title}</h1>
                                    <p className="text-sm text-gray-600">{cert.provider} ({cert.date})</p>
                                </div>
                                <div className="flex space-x-3 text-xl">
                                    <FaEdit className="text-orange-600 cursor-pointer" onClick={() => handleEdit(cert)} />
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(cert._id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => setPopup(true)}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                        >
                            <FaPlus className="mr-2" /> Add Certificates
                        </button>
                    </div>
                </div>
            </div>

            {popup && (
                <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h3 className="text-2xl text-center">{editing ? "Edit Certificate" : "Add Certificate"}</h3>
                        <input type="text" placeholder="Title" className="w-full p-2 border my-2" value={certificateData.title} onChange={(e) => setCertificateData({ ...certificateData, title: e.target.value })} />
                        <input type="text" placeholder="Provider" className="w-full p-2 border my-2" value={certificateData.provider} onChange={(e) => setCertificateData({ ...certificateData, provider: e.target.value })} />
                        <input type="date" className="w-full p-2 border my-2" value={certificateData.date} onChange={(e) => setCertificateData({ ...certificateData, date: e.target.value })} />

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
                                onClick={handleSave}
                            >
                                <FaSave className="mr-2" /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;