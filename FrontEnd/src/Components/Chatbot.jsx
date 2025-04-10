import React, { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
        const url1="https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyCO7vraGAScJBk_Xs8WSZoVcn4y-Yn-lGg"
      const url =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCO7vraGAScJBk_Xs8WSZoVcn4y-Yn-lGg";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            
            {
        contents: [
          {
            parts: [{ text: input }], // Correct structure for the request body
          },
        ],
      }
        
        ),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error?.message || "Unknown error occurred");
      }

      const data = await response.json();
      console.log(data)
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to AI." },
      ]);
    }
  };

  return (
    <div>
    {/* Chat Button */}
    <button
      onClick={toggleChatbot}
      style={{
        width: "100px",
        height: "70px",
        background: "#5350C5",
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      💬 Chat
    </button>
  
    {/* Chatbox */}
    {isOpen && (
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          width: "300px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            background: "#5350C5",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "56px" }}>
            <TbMessageChatbot/>
          </span>
          
        </div>
  
        {/* Messages */}
        <div style={{ maxHeight: "300px", overflowY: "auto", padding: "10px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                padding: "5px",
                color: "black",
              }}
            >
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </div>
          ))}
        </div>
  
        {/* Input */}
        <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ccc" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            style={{
              flex: 1,
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginRight: "5px",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              background: "#5350C5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Chatbot;