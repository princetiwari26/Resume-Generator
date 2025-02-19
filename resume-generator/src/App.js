import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import BasicInfo from './conponents/BasicInfo';

function App() {
  const [uniqueId, setUniqueId] = useState(null);
  const [resumeData, setResumeData] = useState({ basicInfo: {}});

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
          setResumeData(response.data || { basicInfo: {}});
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  useEffect(() => {
    fetchResumeData();
  }, [uniqueId])

  return (
    <div className='bg-gradient-to-r from-blue-400 to-purple-500 p-4 grid justify-center'>
      <h1 className='text-4xl font-bold text-white text-center mt-4'>Resume Generator</h1>
      <div className='grid md:flex items-center justify-center mt-5 md:space-x-24'>
        <div className='text-white text-lg font-bold bg-slate-800 rounded-lg p-2 border-2'>ID - <span>{uniqueId}</span></div>
      </div>

      <BasicInfo resumeData={resumeData} uniqueId={uniqueId} fetchResumeData={fetchResumeData}/>
    </div>
  );
}

export default App;
