import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where,orderBy } from "firebase/firestore";
import { auth, db } from "/firebase-config"; 

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages"); 

  useEffect(() => {
    if (!room) return; 

    const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesList = [];
      snapshot.forEach((doc) => {
        messagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe(); 
  }, [room]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return; 

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth.currentUser?.displayName || "Anonymous",
      room: room,
    });

    setMessage(""); 
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}</span>
            <p>
              {message.text} <br />
              {message.createdAt?.seconds 
                ? new Date(message.createdAt.seconds * 1000).toLocaleString() 
                : "No timestamp"}
            </p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="newmessage">
        <input
          className="messageinput"
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message} 
        />
        <button type="submit" className="sendmessage">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
