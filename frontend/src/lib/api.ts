// Backend API client for Enterprise Knowledge Assistant
// Configure via VITE_API_BASE_URL; defaults to http://localhost:8000

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8000";

export interface Source {
  filename?: string;
  source?: string;
  chunk_id?: string | number;
  score?: number;
  text?: string;
  [k: string]: unknown;
}

export interface ChatResponse {
  answer?: string;
  response?: string;
  message?: string;
  sources?: Source[];
  [k: string]: unknown;
}

export interface DocumentItem {
  id?: string;
  filename?: string;
  name?: string;
  type?: string;
  size?: number;
  uploaded_at?: string;
  chunks?: number;
  [k: string]: unknown;
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  baseUrl: BASE_URL,

  async chat(query: string, history: ChatHistoryItem[]): Promise<ChatResponse> {
    const res = await fetch(`${BASE_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, question: query, message: query, history }),
    });
    return handle<ChatResponse>(res);
  },

  // async listDocuments(): Promise<DocumentItem[]> {
  //   const res = await fetch(`${BASE_URL}/documents`);
  //   const data = await handle<DocumentItem[] | { documents?: DocumentItem[] }>(res);
  //   if (Array.isArray(data)) return data;
  //   return data.documents ?? [];
  // },


async listDocuments(): Promise<DocumentItem[]> {
  const res = await fetch(`${BASE_URL}/documents`);
  const data = await handle<{ documents?: string[] }>(res);

  return (data.documents ?? []).map((name) => ({
    filename: name,
  }));
},


async upload(file: File, onProgress?: (pct: number) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${BASE_URL}/upload`);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(xhr.responseText || `Upload failed: ${xhr.status}`));
      };
      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(fd);
    });
  },
};
