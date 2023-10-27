import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("/");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      from: "Me",
      body: message,
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };
  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1
          className="
        
        text-3xl font-bold text-center mb-10"
        >
          Chat con React
        </h1>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Write your message..."
          name="message"
          id="message"
          className="border-2 border-zinc-500 p-2 rounded-md w-full mb-5 text-black"
        />
        <ul>
        {messages.map((message, index) => (
          <li key={index} className={
            message.from === "Me" ? "my-2 p-2 table text-sm rounded-md bg-sky-500 mr-auto" : "my-2 p-2 table text-sm rounded-md bg-green-700 ml-auto"
          }
          >
            <span className="text-xs text-white-200 block">{message.from}: </span>
            <span className="text-md">{message.body}</span>
          </li>
        ))}
      </ul>
      </form>

      
    </div>
  );
}
