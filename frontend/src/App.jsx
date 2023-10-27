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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Write your message..."
          name="message"
          id="message"
        />
        <button type="submit">Send</button>
      </form>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.from}:{message.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
