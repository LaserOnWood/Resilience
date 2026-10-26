import { describe, expect, it } from 'vitest';
import hits from '../src/data/hits.json';
import zones from '../src/data/body-zones.json';
import accessories from '../src/data/accessories.json';
import phrases from '../src/data/token-phrases.json';
import { createDraw, drawToken, pickOne, validateData } from '../src/lib/game';

describe('Validation des données', () => {
  it('valide les données actuelles du jeu', () => {
    expect(validateData()).toBe(true);
  });

  it('conserve les groupes de cartes non vides avec des identifiants uniques', () => {
    for (const group of [hits, zones, accessories]) {
      expect(group.length).toBeGreaterThan(0);
      expect(new Set(group.map(card => card.id)).size).toBe(group.length);
    }
  });

  it('contient uniquement des valeurs de coups entières et positives', () => {
    expect(hits.every(card => Number.isInteger(card.value) && card.value > 0)).toBe(true);
  });

  it('conserve une option « Sans accessoire »', () => {
    expect(accessories.some(card =>
      card.name === 'Sans accessoire' && card.value === 'Sans accessoire',
    )).toBe(true);
  });
});

describe('pickOne', () => {
  it('choisit la première valeur lorsque le hasard vaut zéro', () => {
    expect(pickOne([1, 2, 3], () => 0)).toBe(1);
  });

  it('choisit la dernière valeur lorsque le hasard est proche de un', () => {
    expect(pickOne([1, 2, 3], () => 0.999)).toBe(3);
  });

  it('rejette une liste vide', () => {
    expect(() => pickOne([])).toThrow('Liste de tirage vide');
  });

  it.each([-0.1, 1, NaN, Infinity, -Infinity])(
    'rejette une valeur aléatoire invalide (%s)',
    value => {
      expect(() => pickOne([1], () => value)).toThrow('Valeur aléatoire invalide');
    },
  );
});

describe('Création d’un tirage', () => {
  it('crée trois cartes dans le bon ordre et un jeton', () => {
    const draw = createDraw(() => 0);

    expect(draw.cards).toHaveLength(3);
    expect(draw.cards.map(card => card.category)).toEqual(['hits', 'body-zone', 'accessory']);
    expect(draw.token).toEqual(phrases[0]);
    expect(draw.id).toBeTruthy();
    expect(Number.isNaN(Date.parse(draw.createdAt))).toBe(false);
  });

  it('peut sélectionner le dernier élément de chaque liste', () => {
    const draw = createDraw(() => 0.999999);

    expect(draw.cards[0].id).toBe(hits[hits.length - 1].id);
    expect(draw.cards[1].id).toBe(zones[zones.length - 1].id);
    expect(draw.cards[2].id).toBe(accessories[accessories.length - 1].id);
    expect(draw.token.id).toBe(phrases[phrases.length - 1].id);
  });

  it('tire un jeton de manière déterministe avec un hasard contrôlé', () => {
    expect(drawToken(() => 0).id).toBe(phrases[0].id);
    expect(drawToken(() => 0.999999).id).toBe(phrases[phrases.length - 1].id);
  });
});
