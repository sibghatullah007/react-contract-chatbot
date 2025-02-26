"use client";

import { useState, useEffect, useRef } from "react";
import { chatWithContract } from "../utils/api";
import ReactMarkdown from "react-markdown";
import Summary from "@/components/Summary";
import TypingDots from "@/components/TypingDots"; // Import TypingDots

export default function Chatbot({ contractId, summary }: { contractId: string; summary: string | null }) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string | React.ReactNode }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    
    // Ensure scrolling after message is added
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = async () => {
    if (!question.trim()) return;

    // Show typing indicator
    setChat((prevChat) => [...prevChat, { user: question, bot: <TypingDots /> }]);
    setQuestion("");

    try {
      const { answer } = await chatWithContract(contractId, question);

      // Replace typing indicator with actual response
      setChat((prevChat) => [...prevChat.slice(0, -1), { user: question, bot: answer }]);
    } catch (error) {
      console.error("Error getting response", error);
    }
  };

  return (
    <div className="flex flex-col border p-4 rounded-lg h-[80vh] justify-between">
      {/* Chat container with scrolling */}
      <div ref={scrollRef} className="overflow-y-auto scrollBar">
        <Summary summary={summary || ""} />
        {chat.map((c, i) => (
          <div key={i} className="my-4">
            <div className="border p-4 rounded-lg bg-gray-100 w-fit max-w-[70%] pe-8 ml-auto my-3">
              <p className="text-black font-bold">{c.user}</p>
            </div>
            <div className="border p-4 rounded-lg bg-white w-fit max-w-[80%] pe-8 my-3 flex gap-2 text-gray-700">
              <div>
                {typeof c.bot === "string" ? <ReactMarkdown>{c.bot}</ReactMarkdown> : c.bot}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form with Enter key submission */}
      <form onSubmit={handleSubmit} className="flex gap-[1%]">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-400 p-2 w-[74%] md:w-[89%] mt-2 rounded-lg"
          placeholder="Ask about your contract..."
        />
        <button type="submit" className="bg-black text-white p-2 mt-2 w-[25%] md:w-[10%] rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}
