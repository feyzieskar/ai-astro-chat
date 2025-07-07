const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GÜNEŞ BURCU HESAPLAMA
function getSunSign(month, day) {
  const signs = [
    { name: "Koç", from: [3, 21], to: [4, 19] },
    { name: "Boğa", from: [4, 20], to: [5, 20] },
    { name: "İkizler", from: [5, 21], to: [6, 20] },
    { name: "Yengeç", from: [6, 21], to: [7, 22] },
    { name: "Aslan", from: [7, 23], to: [8, 22] },
    { name: "Başak", from: [8, 23], to: [9, 22] },
    { name: "Terazi", from: [9, 23], to: [10, 22] },
    { name: "Akrep", from: [10, 23], to: [11, 21] },
    { name: "Yay", from: [11, 22], to: [12, 21] },
    { name: "Oğlak", from: [12, 22], to: [1, 19] },
    { name: "Kova", from: [1, 20], to: [2, 18] },
    { name: "Balık", from: [2, 19], to: [3, 20] },
  ];

  for (const sign of signs) {
    const [fromMonth, fromDay] = sign.from;
    const [toMonth, toDay] = sign.to;
    if (
      (month === fromMonth && day >= fromDay) ||
      (month === toMonth && day <= toDay)
    ) {
      return sign.name;
    }
  }
  return "Bilinmiyor";
}

// --- API ENDPOINT ---
app.post('/api/get-analysis', async (req, res) => {
  try {
    const { year, month, day, hour, minute, ascendant } = req.body;
    if (!year || !month || !day || !hour || !minute) {
      return res.status(400).json({ error: 'Eksik doğum bilgisi.' });
    }

    const sunSign = { name: getSunSign(parseInt(month), parseInt(day)) };
    const moonSign = { name: "Yay" };
    const ascendantSign = { name: ascendant || "Bilinmiyor" };

    const prompt = `
      Sen, bilgili, modern ve empatik bir astrologsun. Adın Astro-Gem.
      Sana bir kullanıcının astrolojik 'Büyük Üçlü' bilgilerini vereceğim: Güneş, Ay ve Yükselen burçları.
      Bu bilgilere dayanarak, kullanıcıya özel, samimi ve anlaşılır bir dille, yaklaşık 150 kelimelik kısa bir kişilik analizi yap.
      - Güneş burcunun temel kimliğini ve enerjisini,
      - Ay burcunun duygusal dünyasını ve içgüdüsel tepkilerini,
      - Yükselen burcunun ise dış dünyaya karşı taktığı maskeyi ve ilk izlenimini nasıl etkilediğini açıkla.
      Bu üçünün birbiriyle nasıl bir uyum veya zıtlık içinde olabileceğine dair küçük bir ipucu ver.
      Analizi doğrudan kullanıcıya hitap ederek yaz.

      İşte kullanıcının bilgileri:
      - Güneş Burcu: ${sunSign.name}
      - Ay Burcu: ${moonSign.name}
      - Yükselen Burcu: ${ascendantSign.name}
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error('Hata oluştu:', error);
    res.status(500).json({ error: 'Analiz oluşturulurken bir hata meydana geldi.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});