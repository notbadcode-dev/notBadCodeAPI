import { Router } from 'express';
import { authJwt } from '../../../middlewares/middleware.index';

import * as paletteController from '../controllers/palette.controller'

const router = Router();

router.post('/', authJwt.veriryAppToken, paletteController.createPalette)
router.post('/addLiked', authJwt.veriryAppToken, paletteController.addLikedPalette);
router.post('/substractLiked', authJwt.veriryAppToken, paletteController.substractLikedPalette);


router.get('/', authJwt.veriryAppToken, paletteController.findAllPalettes);
router.get('/paginate', authJwt.veriryAppToken, paletteController.findAllPaginatePalettes);
router.get('/famous', authJwt.veriryAppToken, paletteController.findAllFamousPalettes);
router.get('/:id', authJwt.veriryAppToken, paletteController.findPaletteById);

router.put('/:id', authJwt.veriryAppToken, paletteController.updatePalette);

router.delete('/:id', authJwt.veriryAppToken, paletteController.deletePalette)

export default router;