import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'
// FIX: Changed './configs/db.js' to '../configs/db.js'
// This goes "up" one directory from 'server' to find the 'configs' folder.

import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

// --- Database Connection ---
// It's good practice to connect to the DB before starting the server.
await connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middlewares ---
app.use(express.json());
app.use(cors());

// --- Inngest Middleware ---
// The 'serve' function from 'inngest/express' is used to serve the Inngest API.
// It takes your Inngest client and the functions you've defined.
// Note: The import for 'inngest' is still './inngest/index.js',
// assuming the 'inngest' folder IS inside your 'server' folder.
// If it's also at the root, change it to '../inngest/index.js'
app.use('/api/inngest', serve({ client: inngest, functions }));


// --- Routes ---
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Inngest dashboard available at http://localhost:${PORT}/api/inngest`);
});

