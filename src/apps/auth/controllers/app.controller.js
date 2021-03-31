import App from '../models/App.model';

import jwt from 'jsonwebtoken';
import config from '../../../config';
import cryptoJS from 'crypto-js';

export const createApp = async (req, res) => {
    const { id, name } = req.body;
    try {
        const newApp = new App({
            id: id,
            name: name,
        })
    
        const saveApp = await newApp.save();
        res.status(200).json({ message:  `App ${saveApp.name} create successfully`})
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong create App'
        });
    }
}

export const getAppToken = async (req, res) => {
    const { id } = req.body;

    try {
        if (!id) {
            return res.status(400).json({ message: 'Content cannot be empty' });
        }
    
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Id must be a number'});
        }
    
        const AppFoundId = await App.findOne({ id: id });
    
        if (AppFoundId !== null) {
            const AppFound = await App.findById(AppFoundId._id);
            const token = jwt.sign( { id: AppFoundId._id }, config.AUTH_APP.SECRET,  {
                expiresIn: config.AUTH.TOKEN_EXPIRE // 24 Hours
            });
            const hash = cryptoJS.AES.encrypt(token, config.AUTH_APP.SECRET).toString();
            res.status(200).json({ token: hash })
        } else {
            res.status(500).json({ message: 'App not exists'});

        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong creating a palette' });
    }
}