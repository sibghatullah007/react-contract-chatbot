"use client";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
// import Summary from "@/components/Summary";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [contractId, setContractId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <div className="min-h-[75vh] mx-auto p-4 max-w-[1080px] content-center">
      {!contractId ? (
            <FileUpload onUpload={(id, sum) => { setContractId(id); setSummary(sum); }} />
      ) : (
        <>
          {/* <Summary summary={summary || ""} /> */}
          <Chatbot contractId={contractId} summary={summary}/>
        </>
      )}
    </div>
  );
}
