import React from "react";

const StyledResume = ({ resumeData }) => {
    if (!resumeData) return null;

    const { basicInfo, summary, skills, education, workExperience, projects, certificates, links } = resumeData;

    const formatDate = (dateStr) => {
        if (!dateStr) return "Present";
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [year, month] = dateStr.split("-");
        if (month) {
            return `${months[parseInt(month, 10) - 1]} ${year}`;
        }
        return year;
    };

    const formatDateRange = (start, end) => {
        return `${formatDate(start)} - ${formatDate(end)}`;
    };


    return (
        <div className="text-black max-w-[820px] bg-white">
            {/* Name & Contact */}
            <h1 className="text-4xl font-semibold text-center text-black mb-7">{basicInfo?.name}</h1>
            <hr className="border-t border-gray-400" />
            <div className="text-center text-gray-900 text-sm flex justify-around mb-3 -mt-2">
                <p>{basicInfo?.phone}</p>
                <p>{basicInfo?.email}</p>
                <p>{basicInfo?.city}</p>
            </div>
            <hr className="border-t -mt-1 border-gray-400" />

            {/* Summary */}
            {summary && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Summary</h2>
                    <hr className="border-t border-gray-400" />
                    <p className="text-gray-800 text-base font-semibold ml-3">{summary}</p>
                </>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Skills</h2>
                    <hr className="border-t border-gray-400 m-1" />
                    <ul className="list-disc ml-3 text-gray-800 grid grid-cols-3 text-sm">
                        {skills.map((skill, index) => <p key={index}>• {skill}</p>)}
                    </ul>
                </>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Education</h2>
                    <hr className="border-t border-gray-400" />
                    {education.map((edu, index) => (
                        <div key={index} className="mb-2 ml-3">
                            <div className="relative flex">
                                <p className="text-base font-semibold text-gray-800">- {edu.degree || edu.educationLevel}, <span>{edu.stream || edu.board}</span></p>
                                <p className="absolute right-0 text-sm">{formatDateRange(edu.startYear, edu.endYear)}</p>
                            </div>
                            <p className="text-gray-800 text-sm ml-2">{edu.school || edu.college}</p>
                        </div>
                    ))}
                </>
            )}

            {/* Work Experience */}
            {workExperience?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Work Experience</h2>
                    <hr className="border-t border-gray-400" />
                    {workExperience.map((work, index) => (
                        <div key={index} className="mb-2 ml-3">
                            <div className="relative flex">
                                <p className="font-semibold text-slate-800 text-base">• {work.profile}</p>
                                <p className="absolute right-0 text-sm">{formatDateRange(work.startYear, work.endYear)}</p>
                            </div>
                            <p className="text-gray-700 font-semibold text-sm ml-2">{work.organization} | {work.location}</p>
                            <p className="text-gray-800 ml-2">{work.description}</p>
                        </div>
                    ))}
                </>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Projects</h2>
                    <hr className="border-t border-gray-400" />
                    {projects.map((project, index) => (
                        <div key={index} className="mb-2 ml-3">
                            <div className="relative flex">
                                <p className="text-base font-semibold text-gray-800">- {project.title}</p>
                                <p className="absolute right-0 text-sm">{formatDateRange(project.startDate, project.endDate)}</p>
                            </div>
                            <p className="text-gray-800 text-sm ml-2">{project.description}</p>
                        </div>
                    ))}
                </>
            )}

            {/* Certificates */}
            {certificates?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Certifications</h2>
                    <hr className="border-t border-gray-400" />
                    <ul className="list-disc ml-3 grid grid-cols-2 text-sm">
                        {certificates.map((cert, index) => (
                            <div key={index} className="pb-1">
                                <p className="text-slate-700 font-semibold text-base">• {cert.title}</p>
                                <p className="ml-2 text-slate-800">{cert.provider} • {cert.date}</p>
                            </div>
                        ))}
                    </ul>
                </>
            )}


            {/* Links */}
            {links?.length > 0 && (
                <>
                    <h2 className="text-lg font-bold text-slate-900 my-2">Links</h2>
                    <hr className="border-t border-gray-400" />
                    {links.map((link, index) => (
                        <p key={index} className="text-slate-700 font-semibold text-base">{link.website}: <a href={link.url} className="text-blue-600">{link.url}</a></p>
                    ))}
                </>
            )}
        </div>
    );
};

export default StyledResume;