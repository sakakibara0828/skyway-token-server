import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const SKYWAY_API_KEY = process.env.SKYWAY_API_KEY; // Railway の Variables に設定

app.get("/token", async (req, res) => {
  try {
    const response = await fetch("https://api.skyway.io/v1/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SKYWAY_API_KEY}`
      },
      body: JSON.stringify({
        ttl: 3600,
        permissions: { publish: true, subscribe: true }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "トークン取得失敗" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Token server running on port ${PORT}`));
