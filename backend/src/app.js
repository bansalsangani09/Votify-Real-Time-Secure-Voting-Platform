import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import errorHandler from './middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import electionRoutes from './routes/election.routes.js';
import voteRoutes from './routes/vote.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import healthRoutes from './routes/health.routes.js';
import notificationRoutes from './routes/notification.routes.js';

const APP_URL = process.env.APP_URL;

const app = express();

// Security Middleware
app.use(helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // Disable CSP for development to allow reCAPTCHA and Google Auth
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(/\/api\/.*/, limiter);

// Relaxed CORS for development
app.use(cors({
    origin: [APP_URL, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean),
    credentials: true
}));

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Custom Request Logger for Debugging
app.use((req, res, next) => {
    console.log(`\x1b[35m[API-LOG]\x1b[0m ${req.method} ${req.url}`);
    next();
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Votify Enterprise API Running (ESM)' });
});

// API Catch-all for 404s
app.use(/\/api\/.*/, (req, res) => {
    console.log(`\x1b[31m[API-404]\x1b[0m ${req.method} ${req.originalUrl} not found`);
    res.status(404).json({
        success: false,
        message: `API endpoint ${req.originalUrl} (${req.method}) not found on this server.`
    });
});

// Error Handler
app.use(errorHandler);

export default app;
