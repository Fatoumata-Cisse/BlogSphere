import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config(); 
connectDB();     

const app = express();


app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('✅ API BlogSphere en ligne !');
});
app.use('/api/articles', articleRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`));
