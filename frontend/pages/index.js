import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import { FaSearch, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { db } from "../utils/db";
import { Jobs } from "../utils/schema";

export default function Home() {
  const [jobList, setJobList] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    salaryRange: [0, 200000],
  });

  useEffect(() => {
    GetJobs();
  }, []);

  useEffect(() => {
    if (jobList.length > 0) {
      applyFilters(filters);
    }
  }, [jobList, filters]);

  const GetJobs = async () => {
    try {
      const result = await db.select().from(Jobs);
      console.log("Jobs fetched:", result);
      setJobList(result);
      setFilteredJobs(result);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  console.log(filteredJobs);
  

  const addJob = (newJob) => {
    setJobList((prevJobs) => [newJob, ...prevJobs]);
    setFilteredJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSalaryChange = (e) => {
    const newSalary = parseInt(e.target.value, 10);
    setFilters((prevFilters) => ({ ...prevFilters, salaryRange: [0, newSalary] }));
  };

  const applyFilters = (updatedFilters) => {
    const filtered = jobList.filter((job) => {
      const matchesTitle =
        !updatedFilters.title ||
        job.title.toLowerCase().includes(updatedFilters.title.toLowerCase());

      const matchesLocation =
        !updatedFilters.location ||
        job.location.toLowerCase().includes(updatedFilters.location.toLowerCase());

      const matchesType =
        !updatedFilters.type ||
        job.type.toLowerCase() === updatedFilters.type.toLowerCase();

      // Handle salary filtering
      let minSalary = 0, maxSalary = 0;
      if (job.salary) {
        const salaryNumbers = job.salary.match(/\d+/g)?.map(Number); // Extract numbers
        if (salaryNumbers?.length === 1) {
          minSalary = maxSalary = salaryNumbers[0]; // If only one value exists
        } else if (salaryNumbers?.length >= 2) {
          [minSalary, maxSalary] = salaryNumbers; // If range exists
        }
      }

      const matchesSalary =
        minSalary <= updatedFilters.salaryRange[1] &&
        maxSalary >= updatedFilters.salaryRange[0];

      return matchesTitle && matchesLocation && matchesType && matchesSalary;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <JobForm addJob={addJob} />

      {/* Search Filters */}
      <div className="bg-white shadow-md p-5 flex justify-center gap-6 mt-6 mx-10 rounded-lg">
        <div className="flex shadow-md items-center pb-2 px-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            name="title"
            placeholder="Search By Job Title, Role"
            className="ml-2 outline-none"
            value={filters.title}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex shadow-md items-center pl-6 pb-2 px-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <input
            type="text"
            placeholder="Enter Location"
            className="ml-2 outline-none"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex shadow-md items-center pl-6 pb-2 px-2">
          <FaUsers className="text-gray-500" />
          <select
            name="type"
            className="ml-2 text-gray-700"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="flex shadow-md items-center pl-6">
          <span className="text-gray-700">Salary Per Month</span>
          <input
            type="range"
            className="ml-4"
            min="0"
            max="2000000"
            value={filters.salaryRange[1]}
            onChange={handleSalaryChange}
          />
          <span className="ml-2 text-gray-700">
            ₹{filters.salaryRange[0]} - ₹{filters.salaryRange[1]}
          </span>
        </div>
      </div>

      {/* Job Listings */}
      <div className="p-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
