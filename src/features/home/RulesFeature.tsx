interface RulesFeatureProps {
  onContinue: () => void;
  onHome: () => void;
}

export default function RulesFeature({ onContinue, onHome }: RulesFeatureProps) {
  return (
    <section className="panel">
      <p className="eyebrow">Avant de jouer</p>
      <h1>Règles et sécurité</h1>
      <p>
        Chaque booster propose un nombre, une zone et un accessoire, puis
        une phrase neutre. Révélez les trois cartes dans l'ordre de votre
        choix, puis découvrez le jeton.
      </p>
      <p>
        Chaque proposition peut être refusée, adaptée ou interrompue à
        tout moment, sans justification. Discutez des limites et
        privilégiez toujours la sécurité.
      </p>
      <div className="actions">
        <button onClick={onContinue}>J'ai compris</button>
        <button className="secondary" onClick={onHome}>Accueil</button>
      </div>
    </section>
  );
}
