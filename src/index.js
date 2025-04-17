import express from 'express';
import router from './routes/app.js'
import templateEngineerConfig from './config/templateEngineer.config.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {connectDB} from './config/db.config.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startApp = async () =>{
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use('/',router)
    templateEngineerConfig(app)
    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
(
    async () => {
      try {
        await connectDB();
        console.log("Connect DB success");
        await startApp();
      } catch (err) {
        console.error("Error connect:", err); 
        process.exit(1);
      }
    }
)();