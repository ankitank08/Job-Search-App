import Image from "next/image";
import { useState, useEffect } from "react";
import mainLogo from "../public/logos/mainLogo.svg";
import CreateJobDialog from "../components/JobForm";

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!isDialogOpen) {
      setRefresh((prev) => !prev); 
    }
  }, [isDialogOpen]);

  return (
    <nav className="bg-white shadow-md p-4 flex w-fit rounded-full mx-auto mt-5">
      <div className="flex items-center gap-6">
        <Image src={mainLogo} alt="Logo" className="h-10" />
        <div className="flex gap-6">
          <a href="#" className="text-gray-700 font-medium">Home</a>
          <a href="#" className="text-gray-700 font-medium">Find Jobs</a>
          <a href="#" className="text-gray-700 font-medium">Find Talents</a>
          <a href="#" className="text-gray-700 font-medium">About Us</a>
          <a href="#" className="text-gray-700 font-medium">Testimonials</a>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-purple-500 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-600"
        >
          Create Jobs
        </button>
      </div>
      <CreateJobDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </nav>
  );
}
