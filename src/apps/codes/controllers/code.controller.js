import Code from '../models/Code.model';

import { getPagination, getPaginationResult } from '../../../libs/getPagination';

export const createCode = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ message: 'Content cannot be empty' });
    }

    try {
        const newCode = new Code(req.body);
        await newCode.save();
        res.status(200).json('New Code create');
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong creating a code' });
    }
}

export const findAllCodes = async (req, res) => {
    try {
        const codes = await Code.find()
        res.status(200).json(codes)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong retrieving the codes' });
    }
};

export const findAllPaginateCodes = async (req, res) => {
    try {

        const { page,  size, title } = req.query;
        const { limit, offset } = getPagination(page, size);

        const condition = title ? {
            title: { $regex:  new RegExp(title), $options: "i" }
        } : { };

        const data = await Code.paginate(condition, { offset, limit })
        res.status(200).json(getPaginationResult(data))
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong retrieving the codes' });
    }
};

export const findAllFavoriteCodes = async (req, res) => {
    const codes = await Code.find({ isFavorite: true });
    res.status(200).json(codes)
};

export const findCodeById = async (req, res) => {
    const { id } = req.params;
    try {
        const code = await Code.findById(id);

        if (!code) {
            return res.status(404).json({ message: `Code with id ${id} does not exist` })
        }
        res.status(200).json(code)
    } catch (error) {
        res.status(500).json({ message: error.message || `Error retrieving code with id ${id}` });
    }
};

export const updateCode = async (req, res) => {
    const { id } = req.params;
    try {
        await Code.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: `Code with id ${id} updated succesfully` })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong updating the codes' })
    }
};

export const deleteCode = async (req, res) => {
    const { id } = req.params;
    try {
        await Code.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Code were deleted succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message || `Cannot delete code with id ${id}` });
    }
};