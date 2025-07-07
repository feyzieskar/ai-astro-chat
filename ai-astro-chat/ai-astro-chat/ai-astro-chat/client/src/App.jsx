import { useState } from 'react';
import axios from 'axios';
import AstroForm from './components/AstroForm';
import AnalysisDisplay from './components/AnalysisDisplay';

function App() {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalysis = async (formData) => {
    setIsLoading(true);
    setAnalysis('');
    setError('');
    try {
      const apiUrl = 'http://localhost:3001/api/get-analysis';
      const response = await axios.post(apiUrl, formData);
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError('Analiz oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          AI Astro-Chat
        </h1>
        <p className="text-lg text-gray-400">Kişisel Astrolojik Analiz Botun</p>
      </div>

      <AstroForm handleAnalysis={handleAnalysis} isLoading={isLoading} />
      
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <AnalysisDisplay analysis={analysis} />
    </div>
  )
}

export default App