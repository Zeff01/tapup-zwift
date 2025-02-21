import axios from "axios";

export const xenditClient = axios.create({
  baseURL: "https://api.xendit.co",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY + ":").toString("base64")}`,
  },
});
