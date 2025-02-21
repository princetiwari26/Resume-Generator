import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import BasicInfo from './components/BasicInfo';
import Summary from './components/Summary';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Links from './components/Links';
import ResumeButtons from './components/ResumeButtons';

function App() {
  const [uniqueId, setUniqueId] = useState(null);
  const [resumeData, setResumeData] = useState({ basicInfo: {}, education: [], workExperience: [], projects: [], skills: [], certificates: [], links: [] });
  const [searchId, setSearchId] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("uniqueId");
    if (storedId) {
      setUniqueId(storedId);
    } else {
      axios.get("http://localhost:8000/generate-unique-id").then((res) => {
        setUniqueId(res.data.uniqueId);
        localStorage.setItem("uniqueId", res.data.uniqueId);
      });
    }
  }, []);

  const fetchResumeData = () => {
    if (uniqueId) {
      axios
        .get(`http://localhost:8000/api/resumes/${uniqueId}`)
        .then((response) => {
          setResumeData(response.data || { basicInfo: {}, education: [], workExperience: [], projects: [], skills: [], certificates: [], links: [] });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  const fetchResumeData2 = (id) => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/resumes/${id}`)
        .then((response) => {
          setResumeData(response.data || {
            basicInfo: {},
            education: [],
            workExperience: [],
            projects: [],
            skills: [],
            certificates: [],
            links: []
          });
          setUniqueId(id);
          setSearchId('');
          localStorage.setItem("uniqueId", id);
        })
        .catch(() => {
          alert('ID not found!')
        });
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, [uniqueId])

  const handleSearch = () => {
    if (searchId.length === 6) {
      fetchResumeData2(searchId);
    } else {
      alert("ID not found")
    }
  };

  return (
    <div className='bg-gradient-to-r from-blue-400 to-purple-500 p-4 grid justify-center'>
      <h1 className='text-4xl font-bold text-white text-center mt-4'>Resume Generator</h1>
      <div className='grid md:flex items-center justify-center mt-5 md:space-x-24'>
        <div className='text-white text-lg font-bold bg-slate-800 rounded-lg p-2 border-2'>ID - <span>{uniqueId}</span></div>
      </div>

      <div className='w-full h-10 relative'>
        <div className="absolute right-0 mr-5 mt-2 md:mr-20 flex items-center space-x-3">
          {/* Floating Label and Input Container */}
          <div className="relative">
            {/* Floating Label (Now Always Visible) */}
            <label
              className={`absolute left-3 text-gray-600 text-sm transition-all duration-200 
        ${searchId || isFocused ? "-top-5 text-xs bg-white px-1" : "top-2"}`}>
              Enter ID
            </label>

            {/* Hidden Input for User Input */}
            <input
              type="text"
              maxLength="6"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="absolute w-full h-full opacity-0 cursor-text"
            />

            {/* Custom Display Box with Visible Click Effect */}
            <div
              className={`w-48 p-2 border rounded-md text-lg font-bold uppercase 
        flex justify-evenly items-center bg-white tracking-wider transition-all 
        ${isFocused ? "border-blue-500 shadow-md" : "border-gray-400"}`}
              onClick={() => document.querySelector('input[type="text"]').focus()}
            >
              {searchId.split("").map((char, index) => (
                <span key={index} className="text-black">{char}</span>
              ))}
              {Array(6 - searchId.length).fill("_").map((char, index) => (
                <span key={`underscore-${index}`} className="text-gray-500">{char}</span>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            className="w-20 bg-green-500 text-white p-2 hover:bg-green-600 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

      </div>

      <div>
        <BasicInfo resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Summary resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Education resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <WorkExperience resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Projects resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Skills resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Certificates resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
        <Links resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData} />
      </div>
      <ResumeButtons />
    </div>
  );
}

export default App;
