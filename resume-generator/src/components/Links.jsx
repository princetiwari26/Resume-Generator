import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./common/Button";

const Links = ({ resumeData, uniqueId, fetchResumeData }) => {
  const [popup, setPopup] = useState(false);
  const [website, setWebsite] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const domainList = [
    "GitHub", "LinkedIn", "Portfolio", "Resume", "Dev.to",
    "Stack Overflow", "Dribbble", "CodePen", "LeetCode", "HackerRank",
  ];

  useEffect(() => {
    setLinks(resumeData?.links || []);
  }, [resumeData]);

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!website || !url) return;

    try {
      const response = await axios.post("http://localhost:8000/api/resumes/links/add", {
        uniqueId, website, url,
      });
      fetchResumeData();
      setPopup(false);
      setWebsite("");
      setUrl("");
      setLinks(response.data.links);
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleDelete = async (linkId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/resumes/links/${uniqueId}/${linkId}`);
      fetchResumeData();
      setLinks(response.data.links);
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full md:max-w-6xl bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row mx-4 mt-5">
        <div className="md:w-1/5 w-full">
          <h2 className="text-xl font-bold text-gray-800">Links</h2>
        </div>
        <div className="md:w-4/5 w-full space-y-3 mt-4 md:mt-0">
          {links.map((link) => (
            <div key={link._id} className="relative group">
              <p className="font-semibold">{link.website}</p>
              <a href={link.url} target="_blank" rel="noreferrer" className="text-blue-600">{link.url}</a>
              <div className="absolute right-0 top-1">
                <Button onClick={() => handleDelete(link._id)} variant="delete" />
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button variant="add" label="Add Link" onClick={() => setPopup(true)} />
          </div>
        </div>
      </div>

      {popup && (
        <div className="fixed w-full h-screen top-0 left-0 bg-slate-700 bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleAddLink} className="bg-white p-6 rounded-lg w-96 space-y-4">
            <h3 className="text-xl font-bold text-center">Add Link</h3>
            <select
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose a site</option>
              {domainList.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end space-x-3">
              <Button variant="cancel" label="Cancel" onClick={() => setPopup(false)} />
              <Button type="submit" variant="save" label="Save" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Links;