/**
 * auth.ts — Rissala auth helpers
 *
 * All API calls go through /api/django/* which Next.js rewrites to
 * the Django backend (localhost:8000 in dev).
 *
 * Session auth with CSRF tokens:
 *  1. fetch CSRF cookie via GET /api/django/accounts/csrf/
 *  2. include X-CSRFToken header on every POST/PUT/DELETE
 *  3. include credentials: 'include' on every request
 */

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"}/api/accounts`;

// ── CSRF ──────────────────────────────────────────────────────────────────────

/**
 * Read the CSRF token from the csrftoken cookie set by Django.
 */
function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : "";
}

/**
 * Ensure Django has sent the CSRF cookie before any state-changing request.
 */
async function ensureCsrf(): Promise<void> {
  if (!getCsrfToken()) {
    try {
      await fetch(`${API_BASE}/csrf/`, { credentials: "include" });
    } catch (error) {
      console.warn("Failed to fetch CSRF token:", error);
    }
  }
}

// ── Base fetch wrapper ────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: Record<string, string[]> | null; status: number }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const method = (options.method ?? "GET").toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    await ensureCsrf();
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }
  }

  const url = `${API_BASE}${path}`;
  
  // Debug log sans le mot de passe
  if (process.env.NODE_ENV !== "production") {
    let debugBody = options.body;
    if (typeof debugBody === "string") {
      try {
        const parsed = JSON.parse(debugBody);
        if (parsed.password) parsed.password = "***";
        if (parsed.password2) parsed.password2 = "***";
        if (parsed.new_password) parsed.new_password = "***";
        if (parsed.new_password2) parsed.new_password2 = "***";
        debugBody = JSON.stringify(parsed);
      } catch (e) {
        // Ignorer les erreurs de parsing pour les logs
      }
    }
    console.log("[AUTH] URL:", url, "Method:", method, "Body:", debugBody);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.warn("[AUTH] Erreur réseau interceptée :", msg);
    return { data: null, error: { non_field_errors: ["Erreur réseau : Impossible de contacter le serveur."] }, status: 0 };
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[AUTH] Status:", res.status);
  }

  if (res.status === 204) {
    if (process.env.NODE_ENV !== "production") console.log("[AUTH] Response: 204 No Content");
    return { data: null, error: null, status: 204 };
  }

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (e) {
    // Si la réponse n'est pas du JSON
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[AUTH] Response:", json || text);
  }

  if (!res.ok) {
    let errorObj: Record<string, string[]> = {};
    
    if (json) {
      if (typeof json === "string") {
        errorObj = { non_field_errors: [json] };
      } else if (json.detail) {
        errorObj = { non_field_errors: [json.detail] };
      } else if (json.message) {
        errorObj = { non_field_errors: [json.message] };
      } else if (json.error) {
        errorObj = { non_field_errors: [json.error] };
      } else if (typeof json === "object") {
        // Format DRF classique (ex: { email: ["Ce champ est obligatoire."] })
        for (const [key, value] of Object.entries(json)) {
          if (Array.isArray(value)) {
            errorObj[key] = value.map(String);
          } else if (typeof value === "string") {
            errorObj[key] = [value];
          }
        }
      }
    }
    
    // Si l'objet d'erreur est toujours vide après parsing, on utilise des messages par défaut
    if (Object.keys(errorObj).length === 0) {
      switch (res.status) {
        case 400:
          errorObj = { non_field_errors: ["Données invalides."] };
          break;
        case 401:
          errorObj = { non_field_errors: ["Email ou mot de passe incorrect."] };
          break;
        case 403:
          errorObj = { non_field_errors: ["Accès refusé / CSRF manquant."] };
          break;
        case 500:
          errorObj = { non_field_errors: ["Erreur serveur interne."] };
          break;
        default:
          errorObj = { non_field_errors: [`Erreur HTTP ${res.status}.`] };
      }
    }
    
    return { data: null, error: errorObj, status: res.status };
  }

  return { data: json as T, error: null, status: res.status };
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  pseudo: string;
  email: string;
  first_name: string;
  display_name: string;
  date_joined: string;
  last_login: string | null;
}

export interface AuthError {
  [field: string]: string[];
}

// ── API functions ─────────────────────────────────────────────────────────────

export async function getMe(): Promise<AuthUser | null> {
  const { data } = await apiFetch<AuthUser>("/me/");
  return data;
}

export async function register(payload: {
  pseudo: string;
  email: string;
  password: string;
  password2: string;
  accept_terms: boolean;
}): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  const { data, error } = await apiFetch<{ user: AuthUser }>("/register/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { user: data?.user ?? null, error };
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<{ user: AuthUser | null; error: AuthError | null }> {
  const { data, error } = await apiFetch<{ user: AuthUser }>("/login/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { user: data?.user ?? null, error };
}

export async function logout(): Promise<void> {
  await apiFetch("/logout/", { method: "POST" });
}

export async function requestPasswordReset(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await apiFetch("/password-reset/", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return { error };
}

export async function confirmPasswordReset(payload: {
  uidb64: string;
  token: string;
  new_password: string;
  new_password2: string;
}): Promise<{ error: AuthError | null }> {
  const { error } = await apiFetch("/password-reset/confirm/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return { error };
}

// ── Error helpers ─────────────────────────────────────────────────────────────

/**
 * Flatten DRF errors into a single human-readable string.
 */
export function flattenErrors(errors: AuthError): string {
  return Object.values(errors)
    .flat()
    .filter(Boolean)
    .join(" ");
}

/**
 * Get a specific field error (first message) or undefined.
 */
export function fieldError(errors: AuthError | null, field: string): string | undefined {
  return errors?.[field]?.[0];
}
