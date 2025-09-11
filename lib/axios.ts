import axios from "axios";

// Use server-side key for security
const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY || process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY;

if (!XENDIT_SECRET_KEY) {
  console.error("[XENDIT] No API key found! Please set XENDIT_SECRET_KEY in .env");
}

export const xenditClient = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from((XENDIT_SECRET_KEY || "") + ":").toString("base64")}`,
  },
});
