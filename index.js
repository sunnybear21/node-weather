// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// 👉 여기에 본인의 OpenWeatherMap API 키 입력
const API_KEY =process.env.OPENWEATHER_API;

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: '위도(lat)와 경도(lon)가 필요합니다' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'API 호출 실패', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌦 날씨 서버가 http://localhost:${PORT} 에서 실행 중`);
});