import User from '../models/User.model';
import jwt from 'jsonwebtoken';
import config from '../../../config';

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            username: username,
            email: email,
            password: await User.encryptPassword(password),
        })
    
        const saveUser = await newUser.save();
        const token = jwt.sign( { id: saveUser._id }, config.AUTH.SECRET,  {
            expiresIn: config.AUTH.TOKEN_EXPIRE // 24 hours
        });
    
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Something goes wrong signup'
        });
    }
}

export const sigIn = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const matchPassword = await User.comparePassword(password,userNameFound.password );

        if (!matchPassword) {
            return res.status(401).json({
                token: null,
                message: 'Invalid password'
            })
        }

        const token = jwt.sign( { id: userNameFound._id }, config.AUTH.SECRET,  {
            expiresIn: config.AUTH.TOKEN_EXPIRE // 24 hours
        });

        res.status(200).json( { token } );
    
    } catch (error) {
        res.status(500).json({ message: error.message || 'Something goes wrong signup' });
    }
}