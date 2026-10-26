import hits from '../data/hits.json';
import zones from '../data/body-zones.json';
import accessories from '../data/accessories.json';
import phrases from '../data/token-phrases.json';
import type { Card, Draw, TokenPhrase, Category } from '../types/game';

export function pickOne<T>(items: readonly T[], random: () => number = Math.random): T {
  if (!items.length) throw new Error('Liste de tirage vide');

  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new Error('Valeur aléatoire invalide');
  }

  return items[Math.floor(value * items.length)];
}

export function drawToken(random: () => number = Math.random): TokenPhrase {
  return pickOne(phrases, random);
}

export function createDraw(random: () => number = Math.random): Draw {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    cards: [
      pickOne(hits, random) as Card,
      pickOne(zones, random) as Card,
      pickOne(accessories, random) as Card,
    ],
    token: drawToken(random),
  };
}

function hasUniqueNonEmptyIds(items: readonly { id: string }[]): boolean {
  return items.every(item => typeof item.id === 'string' && item.id.trim().length > 0)
    && new Set(items.map(item => item.id)).size === items.length;
}

function isValidCardGroup(
  cards: readonly Card[],
  expectedCategory: Category,
): boolean {
  return cards.length > 0
    && hasUniqueNonEmptyIds(cards)
    && cards.every(card =>
      typeof card.name === 'string'
      && card.name.trim().length > 0
      && card.category === expectedCategory
      && typeof card.description === 'string'
      && typeof card.image === 'string'
      && (
        (typeof card.value === 'number' && Number.isFinite(card.value))
        || (typeof card.value === 'string' && card.value.trim().length > 0)
      ),
    );
}

export function validateData(): boolean {
  const validHits = isValidCardGroup(hits as Card[], 'hits')
    && hits.every(card => typeof card.value === 'number'
      && Number.isInteger(card.value)
      && card.value > 0);

  const validZones = isValidCardGroup(zones as Card[], 'body-zone')
    && zones.every(card => typeof card.value === 'string' && card.value.trim().length > 0);

  const validAccessories = isValidCardGroup(accessories as Card[], 'accessory')
    && accessories.every(card => typeof card.value === 'string' && card.value.trim().length > 0)
    && accessories.some(card => card.name === 'Sans accessoire' && card.value === 'Sans accessoire');

  const validPhrases = phrases.length > 0
    && hasUniqueNonEmptyIds(phrases)
    && phrases.every(phrase => typeof phrase.text === 'string' && phrase.text.trim().length > 0);

  return validHits && validZones && validAccessories && validPhrases;
}
