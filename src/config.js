import { config } from 'dotenv';
config();

export default {
    MONGO_URL: process.env.MONGODB_URI || 'mongodb://root:6900@localhost:27017/notbadcode?authSource=admin',
    PORT: process.env.PORT || 3000,
    AUTH: {
        SECRET: '5gNPzoxna9HFa5J9aJOlMUOuwOB4pea7WCuGC5gJ2cCbvMZfWIwZUoPcqxhozVHY1DXPO9uaJh2qO11hJieqe7qGZi3KhbtsBeYqfH92q0ZbPBnnsg5L5hCyscqNNcwBBoJniYbFtFkQYYWPjudgnYKGnBSoaknkALLFaRkRkG6TopjviTnk1ZNoIFTvruiSO28YCOPJ',
        TOKEN_EXPIRE: 86400
    },
    AUTH_APP: {
        SECRET: '5gNPzoxna9HFa5J9aJOlMUOuwOB4pea7WCuGC5gJ2cCbvMZfWIwZUoPcqxhozVHY1DXPO9uaJh2qO11hJieqe7qGZi3KhbtsBeYqfH92q0ZbPBnnsg5L5hCyscqNNcwBBoJniYbFtFkQYYWPjudgnYKGnBSoaknkALLFaRkRkG6TopjviTnk1ZNoIFTvruiSO28YCOPJ',
        TOKEN_EXPIRE: 2592000
    }
}