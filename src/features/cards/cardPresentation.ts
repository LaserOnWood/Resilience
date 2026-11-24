import type { CSSProperties } from "react";
import type { Card } from "../../types/game";

export function getCardPresentation(card: Card) {
  switch (card.category) {
    case "hits":
      return {
        category: "Nombre",
        ornament: "✧",
        className: "card-number",
      };
    case "body-zone":
      return {
        category: "Zone",
        ornament: "◇",
        className: "card-zone",
      };
    case "accessory":
      return {
        category: "Accessoire",
        ornament: "✦",
        className: "card-accessory",
      };
    case "furniture":
      return {
        category: "Meuble",
        ornament: "✧",
        className: "card-furniture",
      };
  }
}

/**
 * Les valeurs `fontSize` servent aux petits écrans ; `--name-scale` est utilisé
 * sur grand écran, où la taille du texte suit la largeur de la carte (cards.css).
 */
export function getCardNameStyle(name: string): CSSProperties {
  const length = name.length;

  if (length > 28) {
    return { fontSize: "clamp(0.8rem, 2.5vw, 1.1rem)", "--name-scale": 0.62 } as CSSProperties;
  }

  if (length > 22) {
    return { fontSize: "clamp(0.9rem, 3vw, 1.3rem)", "--name-scale": 0.74 } as CSSProperties;
  }

  if (length > 16) {
    return { fontSize: "clamp(1rem, 3.5vw, 1.6rem)", "--name-scale": 0.86 } as CSSProperties;
  }

  return {};
}

/** Réduit la description sur grand écran lorsqu'elle est longue. */
export function getCardDescriptionStyle(description: string): CSSProperties {
  const length = description.length;

  if (length > 110) return { "--desc-scale": 0.72 } as CSSProperties;
  if (length > 70) return { "--desc-scale": 0.85 } as CSSProperties;

  return {};
}
