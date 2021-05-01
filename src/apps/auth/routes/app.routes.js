import { Router } from 'express';

import * as appController from '../controllers/app.controller';

const router = Router();

router.post("/create", appController.createApp);
router.post('/getToken', appController.getAppToken);

export default router;