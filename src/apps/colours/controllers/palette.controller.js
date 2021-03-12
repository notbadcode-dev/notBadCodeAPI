import Palette from '../models/Palette.model';

import { getPagination, getPaginationResult } from '../../../libs/getPagination';

export const createPalette = async (req, res) => {
    if (!req.body.colours) {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }

    const coloursFound = await Palette.findOne({ colours: req.body.colours });

    if (coloursFound !== null) {
        return res.status(500).json({ message: 'Palette already exists' });
    }

    try {
        req.body.isPendingApproval = true;
        const newPalette = new Palette(req.body);
        await newPalette.save();
        res.status(200).json('New Palette create');
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong creating a palette' });
    }
}

export const findAllPalettes = async (req, res) => {
    try {
        const palettes = await Palette.find()
        res.status(200).json(palettes)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong retrieving the palettes' });
    }
};

export const findAllPaginatePalettes = async (req, res) => {
    try {

        const { page,  size, title } = req.query;
        const { limit, offset } = getPagination(page, size);

        const condition = title ? {
            title: { $regex:  new RegExp(title), $options: "i" }
        } : { };

        const data = await Palette.paginate(condition, { offset, limit })
        res.status(200).json(getPaginationResult(data))
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong retrieving the palettes' });
    }
};

export const findAllFamousPalettes = async (req, res) => {

    try {    
        const palettes = await Palette.find({ isFamous: true });
        res.status(200).json(palettes)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong retrieving the palettes' });    }
};

export const findPaletteById = async (req, res) => {
    const { id } = req.params;
    try {
        const palette = await Palette.findById(id);

        if (!palette) {
            return res.status(404).json({ message: `Palette with id ${id} does not exist` })
        }
        res.status(200).json(palette)
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving palette with id ${id}` });
    }
};

export const updatePalette = async (req, res) => {
    const { id } = req.params;
    try {
        await Palette.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: `Palette with id ${id} updated succesfully` })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong updating the palette' })
    }
};

export const deletePalette = async (req, res) => {
    const { id } = req.params;
    try {
        await Palette.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Palette were deleted succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || `Cannot delete palette with id ${id}` });
    }
};