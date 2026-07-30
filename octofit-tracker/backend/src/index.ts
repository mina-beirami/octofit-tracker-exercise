import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is ready' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
