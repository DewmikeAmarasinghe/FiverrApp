const getCurrentUser = () => {
  // Check if we're running in the browser (not during SSR)
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing currentUser from localStorage:", error);
    return null;
  }
};

export default getCurrentUser;