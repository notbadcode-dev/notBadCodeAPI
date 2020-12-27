import { config } from 'dotenv';
config();

export default {
    MONGO_URL: process.env.MONGODB_URI || 'mongodb://root:6900.$mongodbpass@localhost/notbadcode?authSource=admin',
    PORT: process.env.PORT || 3000,
    AUTH: {
        SECRET: 'auth-token',
        TOKEN_EXPIRE: 86400
    }
}