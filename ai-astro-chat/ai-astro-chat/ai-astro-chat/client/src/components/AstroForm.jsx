import { useState } from 'react';

export default function AstroForm({ handleAnalysis, isLoading }) {
  const [formData, setFormData] = useState({
    day: '', month: '', year: '', hour: '', minute: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnalysis(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input name="day" type="number" placeholder="Gün (1-31)" onChange={handleChange} required className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input name="month" type="number" placeholder="Ay (1-12)" onChange={handleChange} required className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input name="year" type="number" placeholder="Yıl (örn: 1995)" onChange={handleChange} required className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <input name="hour" type="number" placeholder="Saat (0-23)" onChange={handleChange} required className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
        <input name="minute" type="number" placeholder="Dakika (0-59)" onChange={handleChange} required className="bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-gray-500">
        {isLoading ? 'Analiz Ediliyor...' : 'Analiz Et'}
      </button>
    </form>
  );
}