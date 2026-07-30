import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import healthRouter from './routes/health';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is ready' });
});

app.use('/api/health', healthRouter);
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
