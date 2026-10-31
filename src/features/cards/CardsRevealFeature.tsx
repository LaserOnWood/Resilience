import type { Draw } from '../../types/game';
import { getCardNameStyle, getCardPresentation } from './cardPresentation';

interface CardsRevealFeatureProps {
  cards: Draw['cards'];
  revealed: number[];
  fanSettled: boolean;
  onRevealCard: (index: number) => void;
  onFanSettled: () => void;
}

/** Les trois cartes et leur animation de révélation. */
export default function CardsRevealFeature({
  cards,
  revealed,
  fanSettled,
  onRevealCard,
  onFanSettled,
}: CardsRevealFeatureProps) {
  return (
    <div
      className={`cards cards-emergence${fanSettled ? ' cards-flat' : ''}`}
      onAnimationEnd={event => {
        if (
          event.target === event.currentTarget.lastElementChild &&
          event.animationName === 'collector-card-emergence'
        ) {
          onFanSettled();
        }
      }}
    >
      {cards.map((card, i) => {
        const isRevealed = revealed.includes(i);
        const presentation = getCardPresentation(card);

        return (
          <button
            key={card.id}
            type="button"
            className={`game-card ${presentation.className}${isRevealed ? ' face-up' : ''}`}
            onClick={() => onRevealCard(i)}
            disabled={isRevealed}
            aria-label={
              isRevealed
                ? `Carte ${i + 1} révélée : ${card.name}`
                : `Révéler la carte ${i + 1}`
            }
          >
            <span className="card-inner">
              <span className="card-face card-back" aria-hidden="true">
                <span className="card-frame">
                  <span className="card-back-top">COLLECTION PRIVÉE</span>

                  <span className="card-back-center">
                    <span className="card-back-ornament">✧</span>
                    <span className="card-back-emblem">
                      <img src="/images/branding/embleme-resilience-transparent.png" alt="" className="card-back-emblem-image" />
                    </span>
                    <span className="card-back-title">RÉSILIENCE</span>
                    <span className="card-back-ornament">✧</span>
                  </span>

                  <span className="card-back-bottom">
                    ÉDITION COLLECTOR
                  </span>
                </span>
              </span>

              <span className="card-face card-front">
                <span className="card-frame">
                  <span className="card-front-heading">
                    <span className="card-category">
                      {presentation.category}
                    </span>
                    <span className="card-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>

                  <span className="card-artwork">
                    <span className="card-artwork-ornament">
                      {presentation.ornament}
                    </span>

                    <span className="card-name" style={getCardNameStyle(card.name)}>
                      {card.name}
                    </span>

                    <span className="card-artwork-ornament">
                      {presentation.ornament}
                    </span>
                  </span>

                  <span className="card-description">
                    {card.description}
                  </span>

                  <span className="card-front-footer">
                    <span>✦</span>
                    <span>RÉSILIENCE</span>
                    <span>✦</span>
                  </span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
