import express from 'express';
import { monitor } from '../controller';

const router = express.Router();

router.get('/', monitor);

export default router;
