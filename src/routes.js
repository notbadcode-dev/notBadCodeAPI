import { Router } from 'express';
import CodesRoutes from './apps/codes/routes/codes.routes';
import AuthRoutes from './apps/auth/routes/auth.routes';


const router = Router();
const api = '/api/notbadcode'

router.use(`${api}/app-codes/codes`, CodesRoutes);
router.use(`${api}/auth/`, AuthRoutes);

export default router;