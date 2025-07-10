import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/github', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.VITE_GITHUB_CLIENT_ID,
        client_secret: process.env.VITE_GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Ошибка обмена кода на токен:', error);
    res.status(500).json({ error: 'Не удалось получить access_token' });
  }
});

app.listen(4000, () => {
  console.log('Сервер запущен на порту 4000');
});