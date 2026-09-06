import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  Eye,
  FileJson,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import type { SiteContent } from "../content";

type Path = (string | number)[];

type AdminProps = {
  initialContent: SiteContent;
  loading: boolean;
  authed: boolean;
  onLogin: (ok: boolean) => void;
  password: string;
  onLeave: () => void;
};

const SAVE_URL = `${import.meta.env.BASE_URL}api/content`;
const SOURCE_LABEL = "public/data/content.json";

const SECTIONS: { key: keyof SiteContent; title: string }[] = [
  { key: "company", title: "Şirket" },
  { key: "hero", title: "Ana Ekran" },
  { key: "services", title: "Hizmetler" },
  { key: "projects", title: "Projeler" },
  { key: "about", title: "Hakkımızda" },
  { key: "process", title: "Süreç" },
  { key: "contact", title: "İletişim" },
  { key: "footer", title: "Alt Bilgi" },
  { key: "navigation", title: "Menü" },
];

const TONES = ["water", "fire", "mix"] as const;

const inputCls =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder-white/25 outline-none transition focus:border-fire";

function pretty(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function blankShape(v: unknown, key?: string): unknown {
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, vv] of Object.entries(v as Record<string, unknown>)) out[k] = blankShape(vv, k);
    return out;
  }
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return false;
  if (key === "tone") return "water";
  return "";
}

function setAt(obj: unknown, path: Path, value: unknown): unknown {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (typeof head === "number") {
    const arr = Array.isArray(obj) ? [...obj] : [];
    arr[head] = setAt(arr[head], rest, value);
    return arr;
  }
  const base = obj && typeof obj === "object" ? (obj as Record<string, unknown>) : {};
  return { ...base, [head]: setAt(base[head], rest, value) };
}

function moveAt(arr: unknown[], from: number, to: number): unknown[] {
  const next = [...arr];
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
}

function removeAt(arr: unknown[], i: number): unknown[] {
  return [...arr.slice(0, i), ...arr.slice(i + 1)];
}

function initAt(obj: unknown, key: string): unknown {
  if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[key];
  if (Array.isArray(obj)) return obj[Number(key)];
  return undefined;
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-white/30">{hint}</p>}
    </div>
  );
}

function Node({
  path,
  label,
  value,
  initialValue,
  onChange,
  depth = 0,
}: {
  path: Path;
  label: string;
  value: unknown;
  initialValue: unknown;
  onChange: (path: Path, value: unknown) => void;
  depth?: number;
}) {
  const heading =
    "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-fire" +
    (depth > 1 ? " mt-4" : "");
  const groupCls = depth > 0 ? "rounded-lg border border-white/[0.08] bg-white/[0.02] p-3" : "";

  if (Array.isArray(value)) {
    const isStringArray = value.length === 0 || value.every((v) => typeof v === "string");
    if (isStringArray) {
      return (
        <Field label={label} hint="Her satır bir öğe olarak kaydedilir.">
          <textarea
            rows={Math.max(2, value.length)}
            className={inputCls + " whitespace-pre font-[inherit]"}
            value={(value as string[]).join("\n")}
            onChange={(e) => onChange(path, e.target.value.split("\n").filter((l) => l.length > 0))}
          />
        </Field>
      );
    }
    return (
      <div>
        <ObjectList
          label={label}
          path={path}
          items={value as unknown[]}
          itemTemplate={Array.isArray(initialValue) ? initialValue[0] : {}}
          onChange={onChange}
          depth={depth}
        />
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className={groupCls}>
        <div className={heading}>{label}</div>
        <div className="space-y-3">
          {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
            <Node
              key={k}
              path={[...path, k]}
              label={pretty(k)}
              value={v}
              initialValue={initAt(initialValue, k)}
              onChange={onChange}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <Field label={label}>
        <select
          value={value ? "1" : "0"}
          onChange={(e) => onChange(path, e.target.value === "1")}
          className={inputCls + " appearance-none"}
        >
          <option value="1">Evet</option>
          <option value="0">Hayır</option>
        </select>
      </Field>
    );
  }

  if (typeof value === "number") {
    return (
      <Field label={label}>
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(path, e.target.value === "" ? 0 : Number(e.target.value))}
          className={inputCls}
        />
      </Field>
    );
  }

  const isTone = label.toLowerCase() === "tone" && (TONES as readonly string[]).includes(value as string);
  return (
    <Field label={label}>
      {isTone ? (
        <select
          value={value as string}
          onChange={(e) => onChange(path, e.target.value)}
          className={inputCls + " appearance-none"}
        >
          {TONES.map((t) => (
            <option key={t} value={t} className="bg-[#0b0f17]">
              {t === "water" ? "Su (mavi)" : t === "fire" ? "Ateş (turuncu)" : "Karışık (iki renk)"}
            </option>
          ))}
        </select>
      ) : (value as string).length > 60 ? (
        <textarea rows={3} value={value as string} onChange={(e) => onChange(path, e.target.value)} className={inputCls} />
      ) : (
        <input value={value as string} onChange={(e) => onChange(path, e.target.value)} className={inputCls} />
      )}
    </Field>
  );
}

function ObjectList({
  label,
  path,
  items,
  itemTemplate,
  onChange,
  depth,
}: {
  label: string;
  path: Path;
  items: unknown[];
  itemTemplate: unknown;
  onChange: (path: Path, value: unknown) => void;
  depth: number;
}) {
  const add = () => {
    const tmpl = itemTemplate && typeof itemTemplate === "object" && !Array.isArray(itemTemplate) ? itemTemplate : {};
    onChange(path, [...items, blankShape(tmpl)]);
  };
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">{label}</span>
        <button
          onClick={add}
          className="flex items-center gap-1.5 rounded-md border border-fire/40 bg-fire/10 px-2.5 py-1 text-[11px] font-medium text-fire transition hover:bg-fire/20"
        >
          <Plus size={13} /> Ekle
        </button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-xs text-white/30">
          Bu liste boş. "Ekle" ile öğe ekleyin.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/70">
                  {label} — {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onChange(path, moveAt(items, i, i - 1))}
                    disabled={i === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition enabled:hover:border-white/30 enabled:hover:text-white disabled:opacity-30"
                    aria-label="Yukarı taşı"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => onChange(path, moveAt(items, i, i + 1))}
                    disabled={i === items.length - 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/60 transition enabled:hover:border-white/30 enabled:hover:text-white disabled:opacity-30"
                    aria-label="Aşağı taşı"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => onChange(path, removeAt(items, i))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-white/50 transition hover:border-fire/40 hover:text-fire"
                    aria-label="Sil"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {Object.entries(item as Record<string, unknown>).map(([k, v]) => (
                  <Node
                    key={k}
                    path={[...path, i, k]}
                    label={pretty(k)}
                    value={v}
                    initialValue={initAt(itemTemplate, k)}
                    onChange={onChange}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Login({
  onLogin,
  password,
  onLeave,
}: {
  onLogin: (ok: boolean) => void;
  password: string;
  onLeave: () => void;
}) {
  const [val, setVal] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0f17] px-6 text-white">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fire to-water shadow-[0_20px_60px_-20px_rgba(240,78,35,0.8)]">
        <Lock size={26} />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">AKMEKANİK Yönetim Paneli</h1>
      <p className="mt-2 text-sm text-white/45">İçerik dosyası: {SOURCE_LABEL}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (val === password) {
            onLogin(true);
          } else {
            setError(true);
            setVal("");
          }
        }}
        className="mt-8 w-full max-w-xs"
      >
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setError(false);
          }}
          placeholder="Yönetim şifresi"
          className={inputCls + " py-3 text-center"}
        />
        {error && <p className="mt-2 flex items-center gap-1.5 pl-1 text-xs text-fire">Yanlış şifre, tekrar deneyin.</p>}
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-fire to-fire-dark py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Giriş Yap
        </button>
      </form>

      <button onClick={onLeave} className="mt-8 inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white">
        <Eye size={16} /> Siteye dön
      </button>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0f17] text-white">
      <Loader2 size={32} className="animate-spin text-fire" />
      <p className="mt-4 text-sm text-white/45">İçerik yükleniyor…</p>
    </div>
  );
}

function Editor({
  initialContent,
  onLeave,
}: {
  initialContent: SiteContent;
  onLeave: () => void;
}) {
  const [draft, setDraft] = useState<SiteContent>(initialContent);
  const [active, setActive] = useState<keyof SiteContent>("company");
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<"idle" | "changed" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initialContent), [draft, initialContent]);

  const update = (path: Path, value: unknown) => {
    setState("changed");
    setDraft((d) => setAt(d, path, value) as SiteContent);
  };

  const enterJson = () => {
    setJsonText(JSON.stringify(draft, null, 2));
    setJsonError(null);
    setMode("json");
  };

  const applyJson = (text: string) => {
    setJsonText(text);
    if (text.trim() === "") {
      setJsonError("İçerik boş olamaz.");
      return;
    }
    try {
      const parsed = JSON.parse(text);
      setJsonError(null);
      setDraft(parsed as SiteContent);
      setState("changed");
    } catch (e) {
      setJsonError(e instanceof Error ? e.message : "Geçersiz JSON.");
    }
  };

  const save = async () => {
    setSaving(true);
    setState("changed");
    try {
      const res = await fetch(SAVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error((data && (data.error || data.message)) || `HTTP ${res.status}`);
      }
      setState("saved");
      setMessage("Değişiklikler kaydedildi ve yayına alındı.");
      setDraft(draft);
    } catch (e) {
      setState("error");
      setMessage(e instanceof Error ? e.message : "Kaydetme başarısız.");
    } finally {
      setSaving(false);
    }
  };

  const statusColor =
    state === "saved" ? "text-emerald-400" : state === "error" ? "text-fire" : dirty || state === "changed" ? "text-amber-400" : "text-white/40";

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f17]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fire to-water">
              <Database size={16} />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">AKMEKANİK Yönetim Paneli</div>
              <div className="text-[11px] text-white/40">GitHub / {SOURCE_LABEL}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`hidden text-xs font-medium sm:inline ${statusColor}`}>
              {state === "saved"
                ? "Kaydedildi"
                : state === "error"
                  ? "Hata"
                  : dirty
                    ? "Kaydedilmemiş değişiklik"
                    : "Güncel"}
            </span>
            {state === "error" && (
              <span className="flex items-center gap-1 text-xs text-fire">
                <AlertTriangle size={14} />
                {message}
              </span>
            )}
            <button
              onClick={() => {
                setDraft(initialContent);
                setState("idle");
                setMessage("");
              }}
              disabled={!dirty}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/70 transition enabled:hover:border-white/30 enabled:hover:text-white disabled:opacity-30"
            >
              <RefreshCw size={14} /> Sıfırla
            </button>
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-fire to-fire-dark px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Kaydet & Yayınla
            </button>
            <button
              onClick={onLeave}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-white/30 hover:text-white"
            >
              <LogOut size={14} /> Çıkış
            </button>
          </div>
        </div>
        {state === "saved" && (
          <div className="border-t border-emerald-500/20 bg-emerald-500/10 px-6 py-2 text-xs text-emerald-300">
            <Check size={13} className="mr-1.5 inline -translate-y-px" />
            {message}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {mode === "form" ? (
          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            <nav className="md:sticky md:top-24 md:h-fit">
              <div className="mb-2 px-1 text-[11px] uppercase tracking-[0.2em] text-white/35">Bölümler</div>
              <ul className="space-y-1">
                {SECTIONS.map((s) => (
                  <li key={s.key}>
                    <button
                      onClick={() => setActive(s.key)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        active === s.key
                          ? "bg-gradient-to-r from-fire/20 to-water/20 font-semibold text-white ring-1 ring-fire/30"
                          : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={enterJson}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-water/40 bg-water/10 px-3 py-2 text-xs font-medium text-water transition hover:bg-water/20"
              >
                <Code2 size={14} /> Ham JSON Düzenle
              </button>
            </nav>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{SECTIONS.find((s) => s.key === active)?.title}</div>
                  <div className="text-xs text-white/40">Bu bölümdeki tüm metinler buradan düzenlenir.</div>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(draft[active] as Record<string, unknown>).map(([k, v]) => (
                  <Node
                    key={k}
                    path={[active, k]}
                    label={pretty(k)}
                    value={v}
                    initialValue={initAt(initialContent[active], k)}
                    onChange={update}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <FileJson size={16} className="text-water" /> Ham JSON
                </div>
                <div className="text-xs text-white/40">Tüm içerik tek blok halinde. Geçerli JSON yazıldıkça form da güncellenir.</div>
              </div>
              <button
                onClick={() => setMode("form")}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/70 transition hover:border-white/30 hover:text-white"
              >
                Form Görünümüne Dön
              </button>
            </div>
            {jsonError && (
              <p className="mb-3 flex items-center gap-1.5 text-xs text-fire">
                <AlertTriangle size={14} /> {jsonError}
              </p>
            )}
            <textarea
              value={jsonText}
              onChange={(e) => applyJson(e.target.value)}
              spellCheck={false}
              className="h-[70vh] w-full resize-y rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-white/90 outline-none focus:border-water"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Admin(props: AdminProps) {
  if (!props.authed) {
    return <Login onLogin={props.onLogin} password={props.password} onLeave={props.onLeave} />;
  }
  if (props.loading) {
    return <LoadingScreen />;
  }
  return <Editor initialContent={props.initialContent} onLeave={props.onLeave} />;
}
