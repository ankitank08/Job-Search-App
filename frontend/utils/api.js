const mockJobs = [
  { id: 1, title: "Frontend Developer", company: "Tech Corp", salary: "$70,000" },
  { id: 2, title: "Backend Engineer", company: "CodeWorks", salary: "$80,000" },
  { id: 3, title: "Full Stack Developer", company: "InnovateX", salary: "$90,000" },
];

export const fetchJobs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockJobs), 500); // Simulate API delay
  });
};

export const createJob = async (jobData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: Date.now(), ...jobData }), 500);
  });
};
