"use client";

import { useState } from "react";
import { uploadPDF } from "../utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";

export default function FileUpload({ onUpload }: { onUpload: (id: string, summary: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const { contract_id, summary } = await uploadPDF(file);
      onUpload(contract_id, summary);
    } catch (error) {
      console.error("Upload failed", error);
    }
    setLoading(false);
  };

  return (
<div className="flex flex-col items-center justify-center gap-6 p-6 bg-white border border-gray-400 shadow-lg rounded-2xl w-full">
  <Label htmlFor="file-upload" className="flex items-center gap-2 text-gray-700 text-lg font-medium">
    <UploadCloud className="w-6 h-6 text-blue-500" />
    Upload your contract
  </Label>
  <Input 
    id="file-upload"
    type="file" 
    onChange={(e) => setFile(e.target.files?.[0] || null)} 
    className="cursor-pointer border-gray-300 shadow-xl file:bg-gray-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
  />
  <button 
    onClick={handleUpload} 
    disabled={!file || loading} 
    className="bg-black text-white px-4 py-2 rounded hover:text-gray-100 transition-all"
  >
    {loading ? "Uploading..." : "Upload PDF"}
  </button>
</div>
  );
}
