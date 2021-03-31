
import app from './app';
import './database';

app.listen(app.get('port'));

console.info('Server on port', app.get('port'));