/**
 * Small localStorage-backed store for the order enquiry.
 *
 * Using an external store (instead of state restored inside an effect) keeps the
 * server render stable, avoids hydration mismatches and syncs the cart across
 * tabs. Read with `useSyncExternalStore`.
 */

export type Quantities = Record<string, number>;

export const EMPTY: Quantities = {};
const STORAGE_KEY = "calicut-paradise.enquiry.v1";

let snapshot: Quantities | null = null;
const listeners = new Set<() => void>();

function sanitise(raw: unknown): Quantities {
  if (!raw || typeof raw !== "object") return EMPTY;
  const clean: Quantities = {};
  for (const [id, qty] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof qty === "number" && Number.isFinite(qty) && qty > 0) {
      clean[id] = Math.min(99, Math.floor(qty));
    }
  }
  return clean;
}

function read(): Quantities {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitise(JSON.parse(raw)) : EMPTY;
  } catch {
    // Private mode or a corrupt entry: start empty rather than break the page.
    return EMPTY;
  }
}

export function getSnapshot(): Quantities {
  if (snapshot === null) snapshot = read();
  return snapshot;
}

/** Stable reference for SSR/hydration; React swaps to the live snapshot after mount. */
export function getServerSnapshot(): Quantities {
  return EMPTY;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      snapshot = read();
      listeners.forEach((entry) => entry());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function update(next: Quantities): void {
  snapshot = next;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Ignore quota/private-mode failures; the in-memory cart still works.
  }
  listeners.forEach((listener) => listener());
}
