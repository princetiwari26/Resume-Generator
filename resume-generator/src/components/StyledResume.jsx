import React from "react";
import { FaPaperclip } from "react-icons/fa";

const StyledResume = ({ resumeData }) => {
    if (!resumeData) return null;

    const { basicInfo, summary, skills, education, workExperience, projects, certificates, links } = resumeData;

    return (
        <div className="text-black max-w-[800px] mx-auto bg-white">
            {/* Name & Contact */}
            <h1 className="text-4xl font-bold text-center text-sky-600 mb-2">{basicInfo?.name}</h1>
            <p className="text-center text-gray-700 font-semibold">
                {basicInfo?.city} | {basicInfo?.email} | {basicInfo?.phone}
            </p>
            <hr className="my-4 border-t-2 border-gray-400" />

            {/* Summary */}
            {summary && (
                <>
                    <h2 className="text-md font-bold text-slate-800">SUMMARY</h2>
                    <p className="text-gray-800 mt-1">{summary}</p>
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">SKILLS</h2>
                    <ul className="list-disc ml-6 mt-1 text-gray-800 grid grid-cols-3">
                        {skills.map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">EDUCATION</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-4 mt-1">
                            <p className="font-bold text-slate-700">{edu.degree || edu.educationLevel} | {edu.school}</p>
                            <p className="text-gray-700 text-sm">{edu.board} | {edu.startYear} - {edu.endYear}</p>
                        </div>
                    ))}
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Work Experience */}
            {workExperience?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">WORK HISTORY</h2>
                    {workExperience.map((work, index) => (
                        <div key={index} className="mb-4 mt-1">
                            <p className="font-bold text-slate-700">{work.profile} | {work.organization}</p>
                            <p className="text-gray-700 font-semibold text-sm">{work.location} | {work.startYear} - {work.endYear || 'Present'}</p>
                            <p className="text-gray-800">{work.description}</p>
                        </div>
                    ))}
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">PROJECTS</h2>
                    {projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center">
                                <p className="font-bold text-slate-700">{project.title}</p>
                                {/* <span className="ml-1 text-sm">{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold"><FaPaperclip /></a>}</span> */}
                            </div>
                            <p className="text-gray-700 text-sm font-semibold">{project.startDate} - {project.endDate}</p>
                            <p className="text-gray-800 text-sm">{project.description}</p>
                        </div>
                    ))}
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Certificates */}
            {certificates?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">CERTIFICATIONS</h2>
                    {certificates.map((cert, index) => (
                        <div key={index} className="mb-2 mt-1">
                            <p className="font-bold text-slate-700">{cert.title} | {cert.provider}</p>
                            <p className="text-gray-700 font-semibold text-sm">{cert.date}</p>
                        </div>
                    ))}
                    <hr className="my-4 border-t-2 border-gray-400" />
                </>
            )}

            {/* Links */}
            {links?.length > 0 && (
                <>
                    <h2 className="text-md font-bold text-slate-800">LINKS</h2>
                    {links.map((link, index) => (
                        <p key={index} className="text-slate-700 font-semibold">{link.website}: <a href={link.url} className="text-blue-700">{link.url}</a></p>
                    ))}
                </>
            )}
        </div>
    );
};

export default StyledResume;
