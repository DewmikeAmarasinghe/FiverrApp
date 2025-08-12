import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import gigRoute from './routes/gig.route.js'
import orderRoute from './routes/order.route.js'
import messageRoute from './routes/message.route.js'
import reviewRoute from './routes/review.route.js'
import cookieParser from 'cookie-parser'
import conversationRoute from './routes/conversation.route.js'
import cors from "cors"
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

// CORS configuration
// Ensure localhost dev and optional deployed domains are permitted
const alwaysAllowedDevOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const allowedOrigins = [
  // Explicit dev origins
  ...alwaysAllowedDevOrigins,
  // Frontend URL (set in env for staging/prod)
  process.env.FRONTEND_URL || null,
  // Railway (optional)
  process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : null,
  process.env.RAILWAY_STATIC_URL || null,
  // Manual comma-separated list
  ...(process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(",").map(o => o.trim()) : []),
  // Netlify frontend
  "https://fiverrappnetlify.netlify.app",
  "https://*.netlify.app",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // direct match or startsWith to cover trailing slashes
      const isAllowed = allowedOrigins.some((allowed) =>
        origin === allowed || origin.startsWith(allowed)
      );

      if (isAllowed) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// API Routes
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/gigs',gigRoute)
app.use('/api/orders',orderRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)
app.use('/api/reviews',reviewRoute)

// Serve client (if present) or a simple health response
const publicDir = path.join(__dirname, 'public');
const clientIndexPath = path.join(publicDir, 'index.html');
if (fs.existsSync(clientIndexPath)) {
  app.use(express.static(publicDir));
  // Use a regex catch-all to avoid path-to-regexp issues and to skip API routes
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(clientIndexPath);
  });
} else {
  app.get('/', (_req, res) => {
    res.status(200).send('API is running');
  });
}

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});