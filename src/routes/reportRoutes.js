import { Router } from 'express';
import * as reportController from '../controllers/reportController.js';

const router = Router();

router.get('/severity-distribution', reportController.getSeverityDistribution);

export default router;