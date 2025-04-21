import React, { useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const AskDoctorButton = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "أهلاً بك! كيف يمكنني مساعدتك؟", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "أنت طبيب افتراضي ترد على أسئلة المستخدمين بشكل بسيط." },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await response.json();
      const botText = data.choices?.[0]?.message?.content || "حدث خطأ، حاول لاحقًا.";
      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [...prev, { text: "حدث خطأ، حاول لاحقًا.", sender: "bot" }]);
    }

    setLoading(false);
  };

  return (
    <>
      {showChat && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <span style={styles.headerTitle}>حكيم</span>
            <FiX onClick={toggleChat} style={styles.closeIcon} />
          </div>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    ...styles.bubble,
                    backgroundColor: msg.sender === "user" ? "#e0f7fa" : "#f1f1f1",
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    borderTopLeftRadius: msg.sender === "user" ? "12px" : "0",
                    borderTopRightRadius: msg.sender === "user" ? "0" : "12px",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: "center", color: "#aaa", fontSize: "14px" }}>
                جاري التفكير...
              </div>
            )}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} style={styles.sendButton}>
              إرسال
            </button>
          </div>
        </div>
      )}

<button onClick={toggleChat} style={styles.floatingButton} title="اسأل حكيم">
  <FiMessageCircle size={20} style={{ marginLeft: "6px" }} />
  <span style={{ fontWeight: "bold" }}>اسأل حكيم</span>
</button>

    </>
  );
};

const mainColor = "#006272";

const styles = {
    floatingButton: {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        backgroundColor: "#006272",
        color: "#fff",
        border: "none",
        borderRadius: "30px",
        padding: "15px 18px",
        boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
        cursor: "pointer",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",  // مهم جداً
        fontSize: "18px",
        gap: "6px",
        transition: "all 0.3s ease",
      }
,      
  chatBox: {
    position: "fixed",
    bottom: "100px",
    right: "25px",
    width: "360px",
    maxHeight: "500px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: mainColor,
    color: "#fff",
    padding: "14px 16px",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: "600",
  },
  closeIcon: {
    cursor: "pointer",
    color: "#fff",
  },
  messages: {
    padding: "16px",
    height: "280px",
    overflowY: "auto",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
  },
  bubble: {
    padding: "10px 14px",
    borderRadius: "12px",
    maxWidth: "80%",
    fontSize: "14px",
    color: "#333",
    display: "inline-block",
    lineHeight: "1.5",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    outline: "none",
  },
  sendButton: {
    marginLeft: "10px",
    backgroundColor: mainColor,
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AskDoctorButton;
