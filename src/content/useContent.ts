import { useEffect, useState } from "react";

/**
 * Public site, içeriği GitHub tarafından yönetilen JSON'dan çeker.
 * - Kaynak hazırsa dönen JSON kullanılır.
 * - 404 ya da ağ hatası oluşursa statik default'lara fallback edilir (offline / ilk cache).
 * Sonuç, "değişken içerik" için asla boş bir sayfa üretmez.
 */

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Canlı içerik: GitHub main'deki güncel dosya. Vercel deploy'a bağımlı olmadığı için
// admin kaydı → GitHub commit → bir sonraki yükleme anında siteye yansır.
const CONTENT_URL =
  "https://raw.githubusercontent.com/luncreadigital/akmekanik/main/public/data/content.json";
const REMOTE_URL = (import.meta.env.VITE_CONTENT_URL as string | undefined) || CONTENT_URL;
// Raw CDN cache'ini geçersiz kılar; her yüklemede en taze commit getirilir.
const LIVE = `${REMOTE_URL}?v=${Date.now()}`;
// base = "/akmekanik/" → BASE_URL + "data/content.json" = "/akmekanik/data/content.json"
// Deploy içine kopyalanan statik yedek; canlı kaynak düşerse fallback olarak kullanılır.
const DATA_URL = `${import.meta.env.BASE_URL}data/content.json`;

function normalizeRemote(raw: unknown): unknown {
  // Remote content.json yapısı { content: {...} } sözleşmesiyle gelir.
  if (raw && typeof raw === "object" && "content" in raw) {
    return (raw as { content: unknown }).content;
  }
  return raw;
}

export function useContent() {
  const [state, setState] = useState<FetchState<unknown>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    const candidates = [LIVE, DATA_URL];

    (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { cache: "no-cache" });
          if (!res.ok) {
            if (res.status === 404 || res.status === 405) continue;
            throw new Error(`HTTP ${res.status} for ${url}`);
          }
          const json = await res.json();
          const data = normalizeRemote(json);
          if (alive) setState({ data, loading: false, error: null });
          return;
        } catch {
          continue;
        }
      }
      // Hiçbir kaynak dönmediyse loading'i bitir; arayüz default'ları kullanır.
      if (alive) setState({ data: null, loading: false, error: "offline" });
    })();

    return () => {
      alive = false;
    };
  }, []);

  return state;
}
