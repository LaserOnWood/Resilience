import type { TokenPhrase } from '../../types/game';

interface TokenFeatureProps {
  canReveal: boolean;
  tokenVisible: boolean;
  token: TokenPhrase;
  onReveal: () => void;
  onReroll: () => void;
  onFinish: () => void;
}

/**
 * Affichage et interactions du jeton de Résilience.
 * Les styles sont conservés dans styles/token.css.
 */
export default function TokenFeature({
  canReveal,
  tokenVisible,
  token,
  onReveal,
  onReroll,
  onFinish,
}: TokenFeatureProps) {
  return (
    <div className="token-area">
      <button
        type="button"
        disabled={!canReveal}
        onClick={onReveal}
        className={`coin${tokenVisible ? ' coin-revealed' : ''}`}
        aria-label={tokenVisible ? 'Jeton révélé' : 'Lancer le jeton pour révéler la phrase'}
        aria-pressed={tokenVisible}
      >
        <span className="coin-aura" aria-hidden="true" />
        <span className="coin-particles" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`coin-particle particle-${i + 1}`} />
          ))}
        </span>
        <span className="coin-rim" aria-hidden="true">
          <span className="coin-face">
            <img
              src="/images/branding/embleme-resilience-transparent.png"
              alt=""
              className="coin-emblem"
            />
            {!tokenVisible && <span className="coin-question">?</span>}
            <span className="coin-inscription">RÉSILIENCE</span>
          </span>
        </span>
      </button>

      <p
        className={tokenVisible ? 'token-phrase token-phrase-visible' : 'token-phrase'}
        aria-live="polite"
      >
        {tokenVisible
          ? token.text
          : canReveal
            ? 'Lancez le jeton pour découvrir votre phrase.'
            : 'Révélez les trois cartes avant le jeton.'}
      </p>

      {tokenVisible && (
        <div className="actions">
          <button className="secondary" onClick={onReroll}>
            Relancer le jeton
          </button>
          <button onClick={onFinish}>
            Voir le récapitulatif
          </button>
        </div>
      )}
    </div>
  );
}
