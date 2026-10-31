interface AgeGateFeatureProps {
  onConfirm: () => void;
}

export default function AgeGateFeature({ onConfirm }: AgeGateFeatureProps) {
  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">Accès réservé aux adultes</p>
        <h1>Résilience</h1>
        <p>
          Cette expérience s'adresse exclusivement aux personnes majeures.
          Le consentement et la possibilité de refuser ou d'arrêter priment
          sur tout tirage.
        </p>
        <div className="actions">
          <button onClick={onConfirm}>
            Je confirme avoir 18 ans ou plus
          </button>
          <a className="secondary" href="https://www.google.com/">
            Quitter
          </a>
        </div>
        <small>
          Déclaration de majorité provisoire : ne constitue pas à elle seule
          une vérification d'âge réglementaire.
        </small>
      </section>
    </main>
  );
}
