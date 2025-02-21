import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import StyledResume from "./StyledResume";

const ResumeButtons = () => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [resumeData, setResumeData] = useState(null);
    const uniqueId = localStorage.getItem("uniqueId");
    const previewRef = useRef(null);
    const downloadRef = useRef(null);

    useEffect(() => {
        if (uniqueId) {
            axios.get(`http://localhost:8000/api/resumes/${uniqueId}`)
                .then(response => setResumeData(response.data))
                .catch(error => console.error("Error fetching resume:", error));
        }
    }, [uniqueId]);

    const generatePDF = async (ref) => {
        if (!resumeData || !ref.current) return;

        const pdf = new jsPDF("p", "mm", "a4");

        pdf.html(ref.current, {
            callback: function (doc) {
                doc.save(`${resumeData.basicInfo.name}.pdf`);
            },
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 850,
        });
    };

    const newResume = () => {
        localStorage.removeItem('uniqueId');
        window.location.reload();
    }


    return (
        <div className="flex place-content-center mt-5 space-x-2">
            {/* Preview Button */}
            <button
                className="text-white bg-slate-900 hover:bg-purple-900 font-semibold p-2 px-4 border-4 rounded-full"
                onClick={() => setIsPreviewOpen(true)}
            >
                Preview
            </button>

            <button
                className="text-white bg-slate-900 hover:bg-green-900 font-semibold p-2 px-4 border-4 rounded-full"
                onClick={() => generatePDF(downloadRef)}
            >
                Download
            </button>

            <button
                className="text-white bg-slate-900 hover:bg-green-900 font-semibold p-2 px-4 border-4 rounded-full"
                onClick={newResume}
                >
                New
            </button>

            <div className="hidden">
                <div ref={downloadRef}>
                    {resumeData && <StyledResume resumeData={resumeData} />}
                </div>
            </div>

            {isPreviewOpen && resumeData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-5 rounded-md w-[850px] max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                            onClick={() => setIsPreviewOpen(false)}
                        >
                            ✖
                        </button>
                        <div ref={previewRef}>
                            <StyledResume resumeData={resumeData} />
                        </div>
                        <button
                            className="text-white bg-slate-900 hover:bg-green-900 font-semibold p-2 px-4 mt-4 rounded-full"
                            onClick={() => generatePDF(previewRef)}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeButtons;