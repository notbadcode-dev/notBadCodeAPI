import { Router } from 'express';
import CodesRoutes from './apps/codes/routes/code.routes';
import PaletteRoutes from './apps/colors/routes/palette.routes';
import AuthRoutes from './apps/auth/routes/auth.routes';
import AppRoutes from './apps/auth/routes/app.routes';


const router = Router();
const api = '/api/notbadcode'
router.use(`${api}/auth/`, AuthRoutes);
router.use(`${api}/app/`, AppRoutes);
router.use(`${api}/app-colors/palettes`, PaletteRoutes);
router.use(`${api}/app-codes/codes`, CodesRoutes);

export default router;