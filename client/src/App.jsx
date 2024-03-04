import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    function getMessage() {
      fetch("http://localhost:3001/api")
        .then((res) => {
          console.log("response = ", res);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          alert("response received");
          console.log("response =>", data.message);
          setMessage(data.message);
        })
        .catch((error) => {
          console.log("Error occurred while fetching data:", error);
        });
    }
    getMessage();
  }, []);

  return <h1 className="text-3xl font-bold underline">Message : {message}</h1>;
}

export default App;
