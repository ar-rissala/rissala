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

const API_BASE = "/api/django/accounts";

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
    await fetch(`${API_BASE}/csrf/`, { credentials: "include" });
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
    headers["X-CSRFToken"] = getCsrfToken();
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 204) return { data: null, error: null, status: 204 };

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return { data: null, error: json ?? { non_field_errors: ["Erreur réseau."] }, status: res.status };
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
