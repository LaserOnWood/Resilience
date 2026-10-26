import hits from '../data/hits.json';
import zones from '../data/body-zones.json';
import accessories from '../data/accessories.json';
import phrases from '../data/token-phrases.json';
import type { Card, Draw, TokenPhrase } from '../types/game';
export function pickOne<T>(items: readonly T[], random: () => number = Math.random): T {
  if (!items.length) throw new Error('Liste de tirage vide');
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) throw new Error('Valeur aléatoire invalide');
  return items[Math.floor(value * items.length)];
}
export function drawToken(random: () => number = Math.random): TokenPhrase { return pickOne(phrases, random); }
export function createDraw(random: () => number = Math.random): Draw {
  return { id: crypto.randomUUID(), createdAt: new Date().toISOString(), cards: [pickOne(hits, random) as Card, pickOne(zones, random) as Card, pickOne(accessories, random) as Card], token: drawToken(random) };
}
export function validateData(): boolean {
  const groups = [hits, zones, accessories];
  for (const group of groups) {
    if (!group.length || group.some(c => !c.id || !c.name || !c.category || typeof c.description !== 'string' || typeof c.image !== 'string' || (typeof c.value !== 'number' && typeof c.value !== 'string'))) return false;
    if (new Set(group.map(c => c.id)).size !== group.length) return false;
  }
  return phrases.length > 0 && phrases.every(p => Boolean(p.id && p.text)) && new Set(phrases.map(p => p.id)).size === phrases.length;
}
