import express from 'express';
import vulnerabilityRoutes from './src/routes/vulnerabilityRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import reportRoutes from './src/routes/reportRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));  // ← NUEVA LÍNEA

app.use('/api/vulnerabilities', vulnerabilityRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});