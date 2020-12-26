import  mongoose from 'mongoose';
import config from './config';

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, {
            user: 'root',
            pass: '6900.$mongodbpass',
            authSource: 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connect to database:', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();

