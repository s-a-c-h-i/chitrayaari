import { useEffect, useState } from "react";

const Chat = ({ setOpenedChatTab, socket }) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Added a cleanup function to remove the event listener when the component unmounts
    const handleIncomingMessage = (data) => {
      setChat((prevChats) => [...prevChats, data]);
    };

    socket.on("messageresponse", handleIncomingMessage);

    return () => {
      socket.off("messageresponse", handleIncomingMessage); // Cleanup function
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim(); // Trimmed the message before adding it to the chat
    if (trimmedMessage !== "") {
      setChat((prevChats) => [...prevChats, { message: trimmedMessage, name: "You" }]);
      socket.emit("message", { message: trimmedMessage });
      setMessage("");
    }
  };

  return (
    <div className="absolute position-fixed top-0 h-100 text-white bg-dark p-3" style={{ width: "250px", right: "0%" }}>
      {/* <button type="button" onClick={() => setOpenedChatTab(false)} className="btn btn-light btn-block w-100 mt-5">
        Close
      </button> */}
      <h6 className="text-center">Type Your Ideas here!</h6>
      <div className="w-100 mt-3 p-2 border border-1 border-white rounded-3 overflow-scroll" style={{ height: "90%", width: "auto", maxWidth: "100%" }}>
        {chat.map((msg, index) => (
          <p key={index} className="my-2 rounded-2 text-center w-100  mt-2 border border-left-0 border-right-0 ">
            {msg.name}: {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-100 mt-2 d-flex rounded-3 ">
        <input
          type="text"
          placeholder="Enter message"
          className="h-100 border-0 rounded-0 py-2 px-4"
          style={{ width: "90%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary rounded-0">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;