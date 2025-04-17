import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templateEngineerConfig = (app) =>{
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
}
export default templateEngineerConfig