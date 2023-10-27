import io from "socket.io-client";

const socket = io('/');

export default function App() {
  return (
    <div>
      Hello World
    </div>
  )
}
