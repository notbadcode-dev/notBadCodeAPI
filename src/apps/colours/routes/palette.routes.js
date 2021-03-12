import { Router } from 'express';
import { authJwt } from '../../../middlewares/middleware.index';

import * as paletteController from '../controllers/palette.controller'

const router = Router();

router.post('/', authJwt.verifyToken, paletteController.createPalette)

router.get('/', authJwt.verifyToken, paletteController.findAllPalettes);
router.get('/paginate', authJwt.verifyToken, paletteController.findAllPaginatePalettes);
router.get('/famous', authJwt.verifyToken, paletteController.findAllFamousPalettes);
router.get('/:id', authJwt.verifyToken, paletteController.findPaletteById);

router.put('/:id', authJwt.verifyToken, paletteController.updatePalette);

router.delete('/:id', authJwt.verifyToken, paletteController.deletePalette)

export default router;