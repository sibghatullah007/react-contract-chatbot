"use client";

import { useState, useEffect, useRef } from "react";
import { chatWithContract } from "../utils/api";
import ReactMarkdown from "react-markdown";
import Summary from "@/components/Summary";
import TypingDots from "@/components/TypingDots";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoArrowDownCircleOutline } from "react-icons/io5";


export default function Chatbot({ contractId, summary }: { contractId: string; summary: string | null }) {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string | React.ReactNode }[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const sendMessage = async () => {
    if (!question.trim()) return;
    setChat((prevChat) => [...prevChat, { user: question, bot: <TypingDots /> }]);
    setQuestion("");

    try {
      const { answer } = await chatWithContract(contractId, question);
      setChat((prevChat) => [...prevChat.slice(0, -1), { user: question, bot: answer }]);
    } catch (error) {
      console.error("Error getting response", error);
    }
  };

  const downloadPDF = async () => {
    const input = contentRef.current;
    if (!input) return;
  
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const usableHeight = pageHeight - margin * 2;
    const usableWidth = pageWidth - margin * 2;
  
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: input.scrollWidth,
    });
  
    const imgHeight = canvas.height;
    const imgWidth = canvas.width;
  
    const ratio = usableWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;
  
    const totalPages = Math.ceil(scaledHeight / usableHeight);
  
    for (let page = 0; page < totalPages; page++) {
      const sourceY = (usableHeight / ratio) * page;
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = imgWidth;
      sliceCanvas.height = usableHeight / ratio;
  
      const sliceCtx = sliceCanvas.getContext("2d");
      if (sliceCtx) {
        sliceCtx.drawImage(canvas, 0, sourceY, imgWidth, usableHeight / ratio, 0, 0, imgWidth, usableHeight / ratio);
  
        const imgData = sliceCanvas.toDataURL("image/png");
  
        if (page > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, margin, usableWidth, usableHeight);
      }
    }
  
    pdf.save("chat-report.pdf");
  };
  

  return (
    <div className="flex flex-col border p-4 rounded-lg h-[80vh] justify-between">
      {/* PDF Export Button */}
      <div className="mb-4 flex justify-end">
        <button onClick={downloadPDF} className="bg-white border border-black text-black p-2 mt-2 rounded-lg w-fit flex gap-2 justify-between items-center">
          Download PDF <IoArrowDownCircleOutline className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Content */}
      <div ref={scrollRef} className="overflow-y-auto scrollBar">
        <div ref={contentRef} className="px-4 py-2 bg-white">
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
      </div>

      {/* Message Input */}
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












// "use client";

// import { useState, useEffect, useRef } from "react";
// import { chatWithContract } from "../utils/api";
// import ReactMarkdown from "react-markdown";
// import Summary from "@/components/Summary";
// import TypingDots from "@/components/TypingDots"; // Import TypingDots

// export default function Chatbot({ contractId, summary }: { contractId: string; summary: string | null }) {
//   const [question, setQuestion] = useState("");
//   const [chat, setChat] = useState<{ user: string; bot: string | React.ReactNode }[]>([]);
//   const scrollRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [chat]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     sendMessage();
    
//     // Ensure scrolling after message is added
//     setTimeout(() => {
//       if (scrollRef.current) {
//         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//       }
//     }, 100);
//   };

//   const sendMessage = async () => {
//     if (!question.trim()) return;

//     // Show typing indicator
//     setChat((prevChat) => [...prevChat, { user: question, bot: <TypingDots /> }]);
//     setQuestion("");

//     try {
//       const { answer } = await chatWithContract(contractId, question);

//       // Replace typing indicator with actual response
//       setChat((prevChat) => [...prevChat.slice(0, -1), { user: question, bot: answer }]);
//     } catch (error) {
//       console.error("Error getting response", error);
//     }
//   };

//   return (
//     <div className="flex flex-col border p-4 rounded-lg h-[80vh] justify-between">
//       {/* Chat container with scrolling */}
//       <div ref={scrollRef} className="overflow-y-auto scrollBar">
//         <Summary summary={summary || ""} />
//         {chat.map((c, i) => (
//           <div key={i} className="my-4">
//             <div className="border p-4 rounded-lg bg-gray-100 w-fit max-w-[70%] pe-8 ml-auto my-3">
//               <p className="text-black font-bold">{c.user}</p>
//             </div>
//             <div className="border p-4 rounded-lg bg-white w-fit max-w-[80%] pe-8 my-3 flex gap-2 text-gray-700">
//               <div>
//                 {typeof c.bot === "string" ? <ReactMarkdown>{c.bot}</ReactMarkdown> : c.bot}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Form with Enter key submission */}
//       <form onSubmit={handleSubmit} className="flex gap-[1%]">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="border border-gray-400 p-2 w-[74%] md:w-[89%] mt-2 rounded-lg"
//           placeholder="Ask about your contract..."
//         />
//         <button type="submit" className="bg-black text-white p-2 mt-2 w-[25%] md:w-[10%] rounded-lg">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
