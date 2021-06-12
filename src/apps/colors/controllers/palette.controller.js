import Palette from '../models/Palette.model';

import { getPagination, getPaginationResult } from '../../../libs/getPagination';

import { setResponse } from '../../../middlewares/response'
import { MessageType } from '../../../common/enums/enums.global';

export const createPalette = async (req, res) => {
    if (!req.body.colours) {
        return res.status(400).json(setResponse(false, ['Content cannot be empty']))
    }

    const coloursFound = await Palette.findOne({ colours: req.body.colours });

    if (coloursFound !== null) {
        return res.status(500).json(setResponse(false, ['Palette already exists']))
    }

    try {
        req.body.isPendingApproval = true;
        const newPalette = new Palette(req.body);
        await newPalette.save();
        res.status(200).json(setResponse(true, ['New Palette create']))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong creating a palette'], error))
    }
}

export const findAllPalettes = async (req, res) => {
    try {
        const palettes = await Palette.find({ isFamous: false })
        res.status(200).json(setResponse(palettes))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findAllPaginatePalettes = async (req, res) => {
    try {

        const { page,  size, title } = req.query;
        const { limit, offset } = getPagination(page, size);

        const condition = title ? {
            title: { $regex:  new RegExp(title), $options: "i" },
            isFamous: false
        } : { isFamous: false };

        const data = await Palette.paginate(condition, { offset, limit })
        res.status(200).json(setResponse(getPaginationResult(page, data)))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findAllFamousPalettes = async (req, res) => {
    try {    
        const palettes = await Palette.find({ isFamous: true });
        res.status(200).json(setResponse(palettes))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findAllFamousPaginatePalettes = async (req, res) => {
    try {

        const { page,  size, title } = req.query;
        const { limit, offset } = getPagination(page, size);

        const condition = title ? {
            title: { $regex:  new RegExp(title), $options: "i" },
            isFamous: true
        } : { isFamous: true };

        const data = await Palette.paginate(condition, { offset, limit })
        res.status(200).json(setResponse(getPaginationResult(page, data)))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findAllLikesPalettes = async (req, res) => {
    try {
        const { likes } = req.body;
        if (likes !== undefined) {
            const palettes = await Palette.find(
                {
                    $and: [
                        { isFamous: false },
                        { $or: likes.map(like => {
                                return { _id: like };
                            })
                        }
                    ]
                }
            );
            res.status(200).json(setResponse(palettes))
        } else {
            res.status(500).json(setResponse(false, [`You don't likes`], error, MessageType.info))
        }

    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findAllLikesPaginatePalettes = async (req, res) => {
    try {
        const { likes } = req.body;

        if (likes !== undefined) {
            const { page,  size, title } = req.query;
            const { limit, offset } = getPagination(page, size);
    
            const condition = title ? {
                $and: [
                    { title: { $regex:  new RegExp(title), $options: "i" } },
                    { isFamous: false },
                    { $or: likes.map(like => {
                            return { _id: like };
                        })
                    }
                ]
            } : {
                $and: [
                    { isFamous: false },
                    { $or: likes.map(like => {
                            return { _id: like };
                        })
                    }
                ]
            }

            const data = await Palette.paginate(condition, { offset, limit })
            res.status(200).json(setResponse(getPaginationResult(page, data)))
        } else {
            res.status(500).json(setResponse(false, [`You don't likes`], error, MessageType.info))
        }
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong retrieving the palettes'], error))
    }
};

export const findPaletteById = async (req, res) => {
    const { id } = req.params;
    try {
        const palette = await Palette.findById(id);

        if (!palette) {
            return res.status(404).json(setResponse(true, [`Palette with id ${id} does not exist`]))
        }
        res.status(200).json(setResponse([palette]))
    } catch (error) {
        res.status(500).json(setResponse(false, [`Error retrieving palette with id ${id}`], error))
    }
};

export const updatePalette = async (req, res) => {
    const { id } = req.params;
    try {
        const palette = await Palette.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(setResponse([palette], [`Palette with id ${id} updated succesfully`]))
    } catch (error) {
        res.status(500).json(setResponse(false, ['Something goes wrong updating the palette'], error))    }
};

export const deletePalette = async (req, res) => {
    const { id } = req.params;
    try {
        await Palette.findByIdAndDelete(req.params.id);
        res.status(200).json(setResponse(true, ['Palette were deleted succesfully']))
    } catch (error) {
        res.status(500).json(setResponse(false, [`Cannot delete palette with id ${id}`], error))
    }
};

export const addLikedPalette = async (req, res) => {
    const { _id } = req.query
    try {
        const likedPalette = await Palette.findById(_id);
        if (likedPalette) {
            if (!likedPalette.isFamous) {
                likedPalette.likes = likedPalette.likes + 1;

                const palette = await Palette.findByIdAndUpdate(_id, likedPalette);
                const resultPalette = await Palette.findById(_id);
                res.status(200).json(setResponse([resultPalette], ['Liked palette succesfully']))
            } else {
                res.status(500).json(setResponse(false, ['Cannot liked palette because it is not suitable for it']))
            }
        } else {
            res.status(500).json(setResponse(false, [`Cannot liked palette with id ${_id}`]))
        }

    } catch (error) {
        res.status(500).json(setResponse(false, [`Cannot liked palette with id ${_id}`], error))
    }
};

export const substractLikedPalette = async (req, res) => {
    const { _id } = req.query
    try {
        const unlikedPalette = await Palette.findById(_id);

        if (unlikedPalette) {
            if (!unlikedPalette.isFamous) {
                if (unlikedPalette.likes > 0) {
                    unlikedPalette.likes = unlikedPalette.likes - 1;
    
                    const palette = await Palette.findByIdAndUpdate(unlikedPalette._id, unlikedPalette);
                    const resultPalette = await Palette.findById(_id);
                    res.status(200).json(setResponse([resultPalette], ['Unliked palette succesfully']))
                } else {
                    res.status(500).json(setResponse(false, [`Cannot unliked palette because likes it is less than 0`]))
                }
            } else {
                res.status(500).json(setResponse(false, ['Cannot unliked palette because it is not suitable for it']))
            }
        } else {
            res.status(500).json(setResponse(false, [`Cannot unliked palette with id ${_id}`], error))
        }
    } catch (error) {
        res.status(500).json(setResponse(false, [`Cannot unliked palette with id ${_id}`], error))
    }
};