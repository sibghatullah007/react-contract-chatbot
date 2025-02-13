"use client";

import { useState } from "react";
import { chatWithContract } from "../utils/api";
import ReactMarkdown from "react-markdown";

export default function Chatbot({ contractId }: { contractId: string }) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    setChat([...chat, { user: question, bot: "Thinking..." }]);
    setQuestion("");

    try {
      const { answer } = await chatWithContract(contractId, question);
      setChat([...chat, { user: question, bot: answer }]);
    } catch (error) {
      console.error("Error getting response", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <div className="h-60 overflow-y-auto">
        {chat.map((c, i) => (
          <div key={i} className="mb-2">
            <p className="text-black font-bold">You: {c.user}</p>
            <div className="text-gray-700"><b>Bot:</b> <ReactMarkdown>{c.bot}</ReactMarkdown></div>
          </div>
        ))}
      </div>
      <div className="flex gap-[1%]">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border border-gray-400 p-2 w-[89%] mt-2 rounded-lg"
        placeholder="Ask about your contract..."
      />
      <button 
        onClick={sendMessage} 
        className="bg-black text-white p-2 mt-2 w-[10%] rounded-lg"
      >
        Send
      </button>
      </div>
    </div>
  );
}
