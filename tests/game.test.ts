import { describe, expect, it } from 'vitest';
import { pickOne, validateData } from '../src/lib/game';
describe('Données et tirage', () => {
  it('valide les données initiales', () => expect(validateData()).toBe(true));
  it('choisit la première valeur à zéro', () => expect(pickOne([1,2,3], () => 0)).toBe(1));
  it('choisit la dernière valeur près de un', () => expect(pickOne([1,2,3], () => 0.999)).toBe(3));
  it('rejette une liste vide', () => expect(() => pickOne([])).toThrow());
  it('rejette une valeur aléatoire invalide', () => expect(() => pickOne([1], () => 1)).toThrow());
});
