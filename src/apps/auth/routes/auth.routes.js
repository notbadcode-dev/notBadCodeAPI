import { Router } from 'express';

import * as authController from '../controllers/auth.controller'
import { verifySignup } from '../../../middlewares/middleware.index'

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", verifySignup.checkDuplicateUsernameOrEmail, authController.signUp);
router.post('/signin', verifySignup.existUsernameOrEmail, authController.sigIn)


export default router;