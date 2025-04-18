import express from 'express';
import memberRoutes from './routes/memberRoutes';
import checkinRoutes from './routes/checkinRoutes';

const app = express();
app.use(express.json());

app.use('/api/members', memberRoutes);
app.use('/api/checkins', checkinRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

export default app;
