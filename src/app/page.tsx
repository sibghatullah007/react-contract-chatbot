import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contract Noggin – AI-Powered Contract Analysis for Small Businesses</title>
        <meta 
          name="description" 
          content="Contract Noggin helps small construction businesses analyze contracts, minimize risks, and secure payments—without legal expertise. Upload, analyze, and negotiate contracts smarter. Get started today!" 
        />
      </Head>
      
      <div className="min-h-[75vh] bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-[75vh] text-center py-20 bg-gray-200">
          <h2 className="text-4xl font-bold mb-4">Fair Contracts, Secure Payments</h2>
          <p className="text-lg max-w-2xl mb-6">
            Contract Noggin helps small businesses in the construction industry analyze contracts, minimize risks, and secure payments—without legal expertise.
          </p>
          <div className="flex space-x-4">
            <Link href="/chat" className="bg-black text-white px-6 py-3 rounded-lg hover:text-gray-100 transition">
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
