
import app from './app';
import './database';

app.listen(app.get('port'));

console.info('+-------------------------------------------+');
console.info('|                                           |');
console.info('|  NOTBADCODE · API * MongoDB * ExpressJS   |');
console.info('|            Server on port: '+app.get('port')+'           |');
