import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ConnectDB } from './config/db.config.js';
import authRoutes from './apis/auth/auth.router.js'; 
import userRoutes from './apis/users/user.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use('/auth', authRoutes); 
app.use('/users', userRoutes); 

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});


// Start the server
(async () => {
    try {
        await ConnectDB();
        console.log('Database connected successfully');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
})();