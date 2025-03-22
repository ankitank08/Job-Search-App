"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Jobs } from '../utils/schema';
import {db} from '../utils/db';



const CreateJobDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    applicationDeadline: '',
    jobDescription: '',
  });

  const onSubmit= async ()=>{
      const salary = formData.salaryMin && formData.salaryMax
      ? `${formData.salaryMin}-${formData.salaryMax}`
      : '';
      const applicationDeadline = formData.applicationDeadline
      ? formData.applicationDeadline
      : null;
      const resp = await db
      .insert(Jobs)
      .values({
        title: formData.jobTitle,
        company: formData.companyName,
        location: formData.location,
        type: formData.jobType,
        salary: salary, 
        deadline: applicationDeadline,
        description: formData.jobDescription,
      });
      
    console.log("Inserted ID:", resp);

    if (resp) {
      window.location.reload();
      onClose();
    }
  }

  const dialogRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-60 backdrop-blur-sm">
      {/* <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"> */}
      <div ref={dialogRef} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Create Job Opening</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1 text-left">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div className="col-span-2 flex space-x-4">
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 text-left">Salary Range</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="salaryMin"
                  placeholder="⥮ ₹0"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
                <input
                  type="text"
                  name="salaryMax"
                  placeholder="⥮ ₹12,00,000"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1 text-left">Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mt-4">
          <label className="text-sm font-medium text-gray-700 mb-1">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Please share a description to let the candidate know more about the job role"
            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            rows="4"
          />
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Save Draft ↡
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Publish »
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobDialog;
