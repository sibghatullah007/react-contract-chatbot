import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[75vh] bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[75vh] text-center py-20 bg-gray-200">
        <h2 className="text-4xl font-bold mb-4">Manage Your Contracts with AI</h2>
        <p className="text-lg mb-6">Upload, analyze, and chat with your contracts instantly.</p>
        <div className="flex space-x-4">
          <Link href="/chat" className="bg-black text-white px-4 py-2 rounded hover:text-gray-100">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
