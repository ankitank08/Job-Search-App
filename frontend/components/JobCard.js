import Image from "next/image";
import JobForm from "../components/JobForm";
import { desc } from "drizzle-orm";
import mainLogo from "../public/logos/mainLogo.svg";
import { FaMapMarkerAlt } from "react-icons/fa";

const JobCard = ({ job }) => {
  // Function to extract max salary and convert to LPA
  const formatSalary = (salary) => {
    if (!salary) return "Not specified";

    const match = salary.match(/\d+/g); // Extract numbers from string
    if (match) {
      let maxSalary = Math.max(...match.map(Number)); // Get max value
      if (maxSalary > 100000) {
        maxSalary = maxSalary / 100000; // Convert annual salary to LPA
      }
      return `${maxSalary} LPA`;
    }

    return salary;
  };

  const parseCardDetails = {
    title: job.title,
    logo: job.logo || mainLogo,
    location: job.location || "",
    salary: formatSalary(job.salary || "12LPA"),
    type: job.type || "Not specified",
    description: job.description || "Job Description",
  };

  return (
    <div
      className="bg-white shadow-lg p-5 flex flex-col gap-3"
      style={{
        width: "316px",
        height: "360px",
        borderRadius: "12px",
        margin: "3px 4px", // Maintain spacing
        boxShadow: "0px 0px 14px 0px #C6BFBF40", // Apply shadow effect
      }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl">
          <Image
            src={parseCardDetails?.logo}
            alt="Company Logo"
            width={40}
            height={40}
          />
        </div>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-lg">
          24h Ago
        </span>
      </div>

      {/* Job Title (Reduced Bottom Margin) */}
      <h2 className="text-xl font-semibold mb-1">{parseCardDetails?.title}</h2>

      {/* Experience, Location, Salary Section */}
      <div className="flex items-center gap-x-6 text-gray-600 text-sm mb-2">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Image src="/logos/exp.svg" alt="Experience" width={20} height={20} />
          1-3 yr Exp
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Image
            src="/logos/location.svg"
            alt="Location"
            width={20}
            height={20}
          />
          {parseCardDetails?.type}
        </span>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Image src="/logos/salary.svg" alt="Salary" width={20} height={20} />
          {parseCardDetails?.salary}
        </span>
      </div>

      {/* Job Description */}
      <ul className="text-gray-600 list-disc pl-5 text-sm leading-tight">
        <li>{parseCardDetails?.description}</li>
        <li>
          A user-friendly interface lets you browse stunning photos and videos.
        </li>
      </ul>

      {/* Apply Now Button */}
      <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-auto">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
