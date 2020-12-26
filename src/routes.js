import { Router } from 'express';

const router = Router();
const api = '/api/notbadcode'

import CodesRoutes from "./apps/codes/routes/codes.routes";

router.use(`${api}/app-codes/codes`, CodesRoutes);

export default router;