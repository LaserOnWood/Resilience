interface WelcomeFeatureProps {
  historyCount: number;
  onStart: () => void;
  onHistory: () => void;
}

export default function WelcomeFeature({ historyCount, onStart, onHistory }: WelcomeFeatureProps) {
  return (
    <section className="panel hero">
      <p className="eyebrow">Une expérience de cartes à partager</p>
      <h1 className="welcome-logo">
        <img src="/images/branding/logo-resilience-transparent.png" alt="Résilience" className="welcome-logo-image" />
      </h1>
      <p className="tagline">
        Ouvrir un paquet de cartes ne vous procurera jamais autant de
        sensations.
      </p>
      <p>
        Trois cartes. Un jeton. <br />
        Une proposition que vous êtes toujours
        libres d'adapter ou de refuser.
      </p>
      <div className="actions">
        <button onClick={onStart}> Commencer </button>
        <button className="secondary" onClick={onHistory}> Mon historique ({historyCount}) </button>
      </div>
    </section>
  );
}
