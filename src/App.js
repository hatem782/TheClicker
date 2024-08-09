import { useEffect, useState } from "react";
import "./App.css";
import Field from "./field/Field";

import io from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3004`);
    setSocket(newSocket);
    console.log("newSocket", newSocket);
    return () => newSocket.close();
  }, []);

  return socket && <Field socket={socket} />;
}

export default App;
