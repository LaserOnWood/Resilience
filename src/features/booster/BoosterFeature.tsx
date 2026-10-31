interface BoosterFeatureProps {
  opening: boolean;
  onStart: () => void;
  onOpeningComplete: () => void;
}

/** Présentation et animation d'ouverture du booster. */
export default function BoosterFeature({
  opening,
  onStart,
  onOpeningComplete,
}: BoosterFeatureProps) {
  return (
    <section className="panel hero">
      <p className="eyebrow">Prototype interactif</p>

      <div
        className={`packet${opening ? ' opening' : ''}`}
        aria-hidden="true"
        onAnimationEnd={event => {
          if (
            !opening ||
            event.target !== event.currentTarget ||
            event.animationName !== 'packet-opening'
          ) {
            return;
          }

          onOpeningComplete();
        }}
      >
        <span className="packet-opening-gap" />
        <span className="packet-lip packet-lip-top" />
        <span className="packet-lip packet-lip-bottom" />
        <span className="packet-tear" />
        <span className="packet-top-seal" />
        <span className="packet-light" />

        <span className="packet-emblem" aria-hidden="true">
          <img
            src="/images/branding/embleme-resilience-transparent.png"
            alt=""
            className="packet-emblem-image"
          />
        </span>

        <span className="packet-brand">RÉSILIENCE</span>
        <span className="packet-edition">ÉDITION COLLECTOR</span>
      </div>

      <h1>{opening ? 'Le booster s’ouvre…' : 'Votre booster attend'}</h1>

      <button onClick={onStart} disabled={opening}>
        {opening ? 'Ouverture en cours…' : 'Ouvrir le booster'}
      </button>

      <small>
        {opening
          ? 'Préparez-vous à découvrir vos cartes.'
          : 'Trois cartes vous attendent à l’intérieur.'}
      </small>
    </section>
  );
}
