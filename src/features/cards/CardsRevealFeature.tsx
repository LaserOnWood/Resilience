import type { Draw } from '../../types/game';
import {
  getCardDescriptionStyle,
  getCardNameStyle,
  getCardPresentation,
} from './cardPresentation';

interface CardsRevealFeatureProps {
  cards: Draw['cards'];
  revealed: number[];
  rerolled: number[];
  fanSettled: boolean;
  onRevealCard: (index: number) => void;
  onRerollCard: (index: number) => void;
  onFanSettled: () => void;
}

/** Les cartes du tirage et leur animation de révélation. */
export default function CardsRevealFeature({
  cards,
  revealed,
  rerolled,
  fanSettled,
  onRevealCard,
  onRerollCard,
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
            key={i}
            type="button"
            className={`game-card ${presentation.className}${isRevealed ? ' face-up' : ''}`}
            onClick={() => (isRevealed ? onRerollCard(i) : onRevealCard(i))}
            aria-label={
              isRevealed
                ? `Carte ${i + 1} révélée : ${card.name}. Activer pour relancer cette carte.`
                : `Révéler la carte ${i + 1}`
            }
          >
            {/* La clé change à chaque relance : la carte se retourne à nouveau. */}
            <span
              key={card.id}
              className={`card-inner${rerolled.includes(i) ? ' rerolled' : ''}`}
            >
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

                  <span
                    className="card-description"
                    style={getCardDescriptionStyle(card.description)}
                  >
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
