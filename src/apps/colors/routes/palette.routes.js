import { Router } from 'express';
import { authJwt } from '../../../middlewares/middleware.index';

import * as paletteController from '../controllers/palette.controller'

const router = Router();

router.post('/', paletteController.createPalette)
router.post('/addLiked', paletteController.addLikedPalette);
router.post('/substractLiked', paletteController.substractLikedPalette);


router.get('/', paletteController.findAllPalettes);
router.get('/paginate', paletteController.findAllPaginatePalettes);
router.get('/famous', paletteController.findAllFamousPalettes);
router.get('/:id', paletteController.findPaletteById);

router.put('/:id', paletteController.updatePalette);

router.delete('/:id', paletteController.deletePalette)

export default router;