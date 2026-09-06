// Vercel Serverless Function — GitHub Contents API write proxy.
// The GitHub token lives ONLY here (server side), never on the client.
import type { VercelRequest, VercelResponse } from "@vercel/node";

const OWNER = "luncreadigital";
const REPO = "akmekanik";
const PATH = "public/data/content.json";
const BRANCH = "main";

const GH_API = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Sadece POST desteklenir." });
    return;
  }

  const token = process.env.GH_TOKEN;
  if (!token) {
    res.status(500).json({ error: "GH_TOKEN sunucu ortamında tanımlı değil." });
    return;
  }

  const body = req.body;
  const content = body && body.content;
  if (!content) {
    res.status(400).json({ error: "Gönderilen içerik boş. { content: {...} } bekleniyor." });
    return;
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "akmekanik-admin",
    "Content-Type": "application/json",
  };

  try {
    // 1. Read the current file so we can get its sha (required for the update PUT).
    const existing = await fetch(GH_API, { method: "GET", headers });

    let sha: string | undefined;
    if (existing.status === 200) {
      const meta = (await existing.json()) as { sha?: string };
      sha = meta.sha;
    } else if (existing.status !== 404) {
      const text = await existing.text();
      res.status(502).json({ error: `GitHub okuma hatası: ${existing.status} — ${text}` });
      return;
    }

    // 2. Serialize deterministically and write.
    const json = JSON.stringify(content, null, 2) + "\n";
    const encoded = Buffer.from(json, "utf-8").toString("base64");

    const putBody: Record<string, unknown> = {
      message: "Admin panel: içerik güncellendi",
      content: encoded,
      branch: BRANCH,
    };
    if (sha) putBody.sha = sha;

    const write = await fetch(GH_API, { method: "PUT", headers, body: JSON.stringify(putBody) });

    if (!write.ok) {
      const text = await write.text();
      res.status(502).json({ error: `GitHub yazma hatası: ${write.status} — ${text}` });
      return;
    }

    const result = (await write.json()) as { commit?: { sha?: string }; content?: { sha?: string } | null };
    res.status(200).json({
      ok: true,
      commitSha: result.commit?.sha ?? null,
      fileSha: result.content?.sha ?? null,
      message: "Değişiklikler GitHub'a kaydedildi.",
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Bilinmeyen hata." });
  }
}
