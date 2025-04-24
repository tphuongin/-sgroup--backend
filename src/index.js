import express from 'express';
import templateEngineerConfig from './config/templateEngineer.config.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.config.js';
import apiRoutes from './apis/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startApp = async () => {
    const app = express();
    const port = 3000;

    // Middleware to parse JSON
    app.use(express.json());

    // API routes
    app.use('/api', apiRoutes);

    // Template engine configuration
    templateEngineerConfig(app);

    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    // Default route
    app.get('/', (req, res) => {
        res.render('index', { title: 'Welcome to the API' });
    });


    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

(async () => {
    try {
        await connectDB();
        console.log("Connect DB success");
        await startApp();
    } catch (err) {
        console.error("Error connect:", err);
        process.exit(1);
    }
})();