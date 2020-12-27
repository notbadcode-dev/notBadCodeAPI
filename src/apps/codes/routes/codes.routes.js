import { Router } from 'express';
import { authJwt } from '../../../middlewares/middleware.index';

import * as codeController from '../controllers/code.controller'

const router = Router();

router.post('/', authJwt.verifyToken, codeController.createCode)

router.get('/', authJwt.verifyToken, codeController.findAllCodes);
router.get('/paginate', authJwt.verifyToken, codeController.findAllPaginateCodes);
router.get('/favorites', authJwt.verifyToken, codeController.findAllFavoriteCodes);
router.get('/:id', authJwt.verifyToken, codeController.findCodeById);

router.put('/:id', authJwt.verifyToken, codeController.updateCode);

router.delete('/:id', authJwt.verifyToken, codeController.deleteCode)

export default router;