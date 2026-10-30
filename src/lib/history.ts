
import type { Draw } from '../types/game';

const HISTORY_KEY = 'resilience-history-v1';
const MAX_HISTORY = 50;

/**
 * Vérifie qu'une donnée stockée ressemble à un tirage valide.
 * Utile si le stockage du navigateur a été altéré.
 */
function isStoredDraw(value: unknown): value is Draw {
  if (!value || typeof value !== 'object') return false;

  const draw = value as Partial<Draw>;

  return (
    typeof draw.id === 'string' &&
    draw.id.length > 0 &&
    typeof draw.createdAt === 'string' &&
    !Number.isNaN(Date.parse(draw.createdAt)) &&
    Array.isArray(draw.cards) &&
    draw.cards.length === 3 &&
    draw.cards.every(card =>
      card &&
      typeof card.id === 'string' &&
      typeof card.name === 'string' &&
      typeof card.description === 'string' &&
      ['hits', 'body-zone', 'accessory'].includes(card.category)
    ) &&
    draw.token !== null &&
    typeof draw.token === 'object' &&
    typeof draw.token?.id === 'string' &&
    typeof draw.token?.text === 'string'
  );
}

/**
 * Récupère les tirages enregistrés, du plus récent au plus ancien.
 */
export function getHistory(): Draw[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(isStoredDraw)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
}

/**
 * Enregistre un tirage sans créer de doublon.
 */
export function saveDraw(draw: Draw): Draw[] {
  const current = getHistory();

  if (current.some(item => item.id === draw.id)) {
    return current;
  }

  const updated = [draw, ...current].slice(0, MAX_HISTORY);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // Stockage indisponible : le jeu reste utilisable.
  }

  return updated;
}

/**
 * Supprime tous les tirages enregistrés.
 */
export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Stockage indisponible.
  }
}
