import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

// Minimal production server that only serves static SPA and a couple of safe API endpoints.
// Avoid importing other server modules to prevent unexpected route registrations.

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health and demo endpoints
app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});

app.get("/api/demo", (_req, res) => {
  res.json({ message: "Hello from Express server" });
});

// In production, serve the built SPA files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API GET requests
app.use((req, res, next) => {
  if (req.method !== "GET") {
    return next();
  }

  if (req.path === "/api" || req.path.startsWith("/api/")) {
    return next();
  }

  if (req.path === "/health" || req.path.startsWith("/health/")) {
    return next();
  }

  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
