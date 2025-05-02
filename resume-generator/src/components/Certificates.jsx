import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./common/Button";

const Certificates = ({ resumeData, uniqueId, fetchResumeData }) => {
    const [popup, setPopup] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [certificateData, setCertificateData] = useState({ title: "", provider: "", date: "" });

    useEffect(() => {
        setCertificateData({ title: "", provider: "", date: "" });
        setEditingId(null);
    }, [resumeData]);

    const resetForm = () => {
        setCertificateData({ title: "", provider: "", date: "" });
        setEditingId(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put("http://localhost:8000/api/resumes/certificates/edit", {
                    uniqueId,
                    certificateId: editingId,
                    ...certificateData
                });
            } else {
                await axios.post("http://localhost:8000/api/resumes/certificates/add", {
                    uniqueId,
                    ...certificateData
                });
            }
            fetchResumeData();
            setPopup(false);
            resetForm();
        } catch (error) {
            console.error("Error saving certificate:", error);
        }
    };

    const handleEdit = (cert) => {
        setCertificateData(cert);
        setEditingId(cert._id);
        setPopup(true);
    };

    const handleDelete = async (certificateId) => {
        try {
            await axios.delete("http://localhost:8000/api/resumes/certificates/delete", {
                data: { uniqueId, certificateId }
            });
            fetchResumeData();
            alert("Certificate deleted successfully!");
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <div className="w-full md:max-w-6xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row mx-4 mt-5">
                <div className="md:w-1/5 w-full flex justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-gray-800">Certificates</h2>
                </div>
                <div className="md:w-4/5 w-full mt-4 md:mt-0">
                    <ul>
                        {resumeData.certificates.map((cert) => (
                            <li key={cert._id} className="border p-3 my-2 flex justify-between items-center bg-gray-100 rounded-lg">
                                <div>
                                    <h3 className="text-lg font-bold">{cert.title}</h3>
                                    <p className="text-sm text-gray-600">{cert.provider} ({cert.date})</p>
                                </div>
                                <div className="flex">
                                    <Button onClick={() => handleEdit(cert)} variant="edit" textColor="text-orange-500" />
                                    <Button onClick={() => handleDelete(cert._id)} variant="delete" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <Button variant="add" label="Add Certificates" onClick={() => setPopup(true)} />
                    </div>
                </div>

                {popup && (
                    <div className="fixed w-full h-screen top-0 left-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-2xl font-bold text-center mb-4">{editingId ? "Edit Certificate" : "Add Certificate"}</h3>
                            <form onSubmit={handleSave} className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input type="text" value={certificateData.title} onChange={(e) => setCertificateData({ ...certificateData, title: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Provider</label>
                                    <input type="text" value={certificateData.provider} onChange={(e) => setCertificateData({ ...certificateData, provider: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="date" value={certificateData.date} onChange={(e) => setCertificateData({ ...certificateData, date: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <Button onClick={() => setPopup(false)} variant="cancel" label="Cancel" />
                                    <Button type="submit" variant="save" label="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certificates;