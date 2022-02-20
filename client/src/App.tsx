import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then(({ message }) => setMessage(message));
  }, []);

  return <div className="App">{message}</div>;
}

export default App;
