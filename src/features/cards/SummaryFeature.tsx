import type { Draw } from '../../types/game';

interface SummaryFeatureProps {
  draw: Draw;
  onNewBooster: () => void;
  onHistory: () => void;
}

/** Résumé du tirage terminé. */
export default function SummaryFeature({
  draw,
  onNewBooster,
  onHistory,
}: SummaryFeatureProps) {
  return (
    <section className="panel">
      <p className="eyebrow">Tirage terminé</p>
      <h1>Récapitulatif</h1>
      {draw.cards.map(card => (
        <p key={card.id}>
          <strong>{card.name}</strong> — {card.description}
        </p>
      ))}
      <p className="quote">{draw.token.text}</p>
      <p>Ce résultat est une proposition, jamais une obligation.</p>
      <div className="actions">
        <button onClick={onNewBooster}> Nouveau booster </button>
        <button className="secondary" onClick={onHistory}> Voir mon historique </button>
      </div>
    </section>
  );
}
