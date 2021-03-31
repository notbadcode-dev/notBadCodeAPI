import { Router } from 'express';

import * as appController from '../controllers/app.controller';
import * as paletteController from '../../colours/controllers/palette.controller'

const router = Router();

router.post("/create", appController.createApp);
router.post('/getToken', appController.getAppToken);

export default router;