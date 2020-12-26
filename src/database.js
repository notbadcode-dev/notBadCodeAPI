import  mongoose from 'mongoose';
import config from './config';

import options from './database.options.json';

(async () => {
    try {
        const db = await mongoose.connect(config.mongodbURL, options);
        console.log('Connect to database:', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();

