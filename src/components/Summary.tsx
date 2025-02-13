import ReactMarkdown from "react-markdown";

export default function Summary({ summary }: { summary: string }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold">Contract Summary</h2>
      <div className="prose prose-sm mt-2 text-gray-700">
        <ReactMarkdown>{summary}</ReactMarkdown>
      </div>
    </div>
  );
}
