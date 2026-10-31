import type { CSSProperties } from 'react';
import type { Card } from '../../types/game';

export function getCardPresentation(card: Card) {
  switch (card.category) {
    case 'hits':
      return {
        category: 'Nombre',
        ornament: '✧',
        className: 'card-number',
      };
    case 'body-zone':
      return {
        category: 'Zone',
        ornament: '◇',
        className: 'card-zone',
      };
    case 'accessory':
      return {
        category: 'Accessoire',
        ornament: '✦',
        className: 'card-accessory',
      };
  }
}

export function getCardNameStyle(name: string): CSSProperties {
  const length = name.length;

  if (length > 28) {
    return { fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)' };
  }

  if (length > 22) {
    return { fontSize: 'clamp(0.9rem, 3vw, 1.3rem)' };
  }

  if (length > 16) {
    return { fontSize: 'clamp(1rem, 3.5vw, 1.6rem)' };
  }

  return {};
}
