const express = require('express');
const cors = require('cors');
require('dotenv').config();
// DOĞRU PAKET: astronomia'yı import ediyoruz
const { Astronomia } = require('astronomia');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- KURULUM ---
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- API ENDPOINT ---
app.post('/api/get-analysis', async (req, res) => {
  try {
    // 1. Frontend'den gelen doğum bilgilerini al
    const { year, month, day, hour, minute } = req.body;
    if (!year || !month || !day || !hour || !minute) {
      return res.status(400).json({ error: 'Eksik doğum bilgisi.' });
    }

    // 2. astronomia kütüphanesi ile burçları hesapla
    const astro = new Astronomia({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      minute: parseInt(minute),
      latitude: 41.0082, // Varsayılan: İstanbul
      longitude: 28.9784 // Varsayılan: İstanbul
    });

    const sunSign = await astro.getSun();
    const moonSign = await astro.getMoon();
    const ascendantSign = await astro.getAscendant();

    // 3. Gemini için prompt oluştur (Bu kısım hiç değişmedi)
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

    // 4. Gemini'yi çağır
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 5. Sonucu frontend'e gönder
    res.json({ analysis: text });

  } catch (error) {
    console.error('Hata oluştu:', error);
    res.status(500).json({ error: 'Analiz oluşturulurken bir hata meydana geldi.' });
  }
});

// --- SUNUCUYU BAŞLAT ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});