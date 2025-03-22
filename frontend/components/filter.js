const handleFilterChange = (filters) => {
    console.log("Current filters:", filters); // Log current filter values
    const filtered = jobList.filter((job) => {
      const matchesTitle = filters.title === '' || job.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesLocation = filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = filters.type === '' || job.type.toLowerCase() === filters.type.toLowerCase();
      // const salary = parseInt(job.salary.replace(/\D/g, '')); // Convert salary to number
      // const matchesSalary = salary >= filters.salaryRange[0] && salary <= filters.salaryRange[1];
      const [minSalary, maxSalary] = job.salary.split('-').map(s => parseInt(s.replace(/\D/g, '')));
      const matchesSalary = (minSalary <= filters.salaryRange[1] && maxSalary >= filters.salaryRange[0]);
  //   
      return matchesTitle && matchesLocation && matchesType && matchesSalary;
    });
  
    console.log("job list:", jobList); // Log job list
    console.log("Filtered results:", filtered); // Log filtered results
    setFilteredJobs(filtered);
  };

