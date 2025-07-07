export default function AnalysisDisplay({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg mt-8 border border-purple-500">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Astro-Gem Diyor ki...</h2>
      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
        {analysis}
      </p>
    </div>
  );
}