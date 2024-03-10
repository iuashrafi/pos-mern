const fetchAPI = async (url, options = {}) => {
  const baseURL = "http://localhost:3000/api";
  const defaultOptions = {
    credentials: "include", // Include credentials - cookies, ssl certificates, http authentication etc
    headers: {
      "Content-Type": "application/json",
    },
  };
  const requestOptions = {
    ...defaultOptions,
    ...options,
  };
  const apiUrl = baseURL + url;
  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};

export default fetchAPI;
