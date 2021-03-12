import { Router } from 'express';
import CodesRoutes from './apps/codes/routes/code.routes';
import ColoursRoutes from './apps/colours/routes/palette.routes';
import AuthRoutes from './apps/auth/routes/auth.routes';


const router = Router();
const api = '/api/notbadcode'

router.use(`${api}/app-codes/codes`, CodesRoutes);
router.use(`${api}/app-colours/colours`, ColoursRoutes);
router.use(`${api}/auth/`, AuthRoutes);

export default router;