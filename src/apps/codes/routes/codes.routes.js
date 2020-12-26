import { Router } from 'express';

import * as codeController from '../controllers/code.controller'

const router = Router();

router.post('/', codeController.createCode)

router.get('/', codeController.findAllCodes);
router.get('/paginate', codeController.findAllPaginateCodes);
router.get('/favorites', codeController.findAllFavoriteCodes);
router.get('/:id', codeController.findCodeById);

router.put('/:id', codeController.updateCode);

router.delete('/:id', codeController.deleteCode)

export default router;