
import { useState } from 'react';
import { createDraw, drawToken } from './lib/game';
import type { Draw } from './types/game';

type Screen = 'welcome' | 'rules' | 'booster' | 'reveal' | 'summary';

export default function App() {
  const [adult, setAdult] = useState(
    () => sessionStorage.getItem('resilience-adult') === 'yes',
  );
  const [screen, setScreen] = useState<Screen>('welcome');
  const [draw, setDraw] = useState<Draw | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [opening, setOpening] = useState(false);

  const start = () => {
    if (opening) return;

    setDraw(createDraw());
    setRevealed([]);
    setTokenVisible(false);
    setOpening(true);
  };


  const revealCard = (index: number) => {
    setRevealed(old =>
      old.includes(index) ? old : [...old, index],
    );
  };

  if (!adult) {
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
            <button
              onClick={() => {
                sessionStorage.setItem('resilience-adult', 'yes');
                setAdult(true);
              }}
            >
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

  return (
    <main className="shell">
      <header className="top">
        <span className="brand">✦ Résilience</span>
        <button className="text-button" onClick={() => setScreen('rules')}>
          Règles et sécurité
        </button>
      </header>

      {screen === 'welcome' && (
        <section className="panel hero">
          <p className="eyebrow">Une expérience de cartes à partager</p>
          <h1>Résilience</h1>
          <p className="tagline">
            Ouvrir un paquet de cartes ne vous procurera jamais autant de
            sensations.
          </p>
          <p>
            Trois cartes. Un jeton. Une proposition que vous êtes toujours
            libres d'adapter ou de refuser.
          </p>
          <button onClick={() => setScreen('rules')}>Commencer</button>
        </section>
      )}

      {screen === 'rules' && (
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
            <button onClick={() => setScreen('booster')}>J'ai compris</button>
            <button
              className="secondary"
              onClick={() => setScreen('welcome')}
            >
              Accueil
            </button>
          </div>
        </section>
      )}

      
      {screen === 'booster' && (
        <section className="panel hero">
          <p className="eyebrow">Prototype interactif</p>
          
          <div
          className={`packet${opening ? ' opening' : ''}`}
          aria-hidden="true"
          onAnimationEnd={() => {
            if (opening) {
              setOpening(false);
              setScreen('reveal');
            }
          }}
          >
            K<br />✦
          </div>

          <h1>{opening ? 'Le booster s’ouvre…' : 'Votre booster attend'}</h1>
          
          <button onClick={start} disabled={opening}>
            {opening ? 'Ouverture en cours…' : 'Ouvrir le booster'}
          </button>
          
          <small>
            {opening
            ? 'Préparez-vous à découvrir vos cartes.'
            : 'Trois cartes vous attendent à l’intérieur.'}
          </small>
        </section>
      )}


      {screen === 'reveal' && draw && (
        <section className="panel wide">
          <p className="eyebrow">À vous de jouer</p>
          <h1>Votre tirage</h1>

          <p className="reveal-progress" aria-live="polite">
            {revealed.length === 3
              ? 'Les trois cartes sont révélées.'
              : `${revealed.length} carte${revealed.length > 1 ? 's' : ''} sur 3 révélée${revealed.length > 1 ? 's' : ''}. Choisissez la prochaine !`}
          </p>

          <div className="cards">
            {draw.cards.map((card, i) => {
              const isRevealed = revealed.includes(i);

              return (
                <button
                  key={card.id}
                  className={
                    'game-card' + (isRevealed ? ' face-up' : '')
                  }
                  onClick={() => revealCard(i)}
                  disabled={isRevealed}
                  aria-label={
                    isRevealed
                      ? `Carte ${i + 1} révélée : ${card.name}`
                      : `Révéler la carte ${i + 1}`
                  }
                >
                  <span className="card-inner">
                    <span className="card-face card-back" aria-hidden="true">
                      <span className="card-symbol">✦</span>
                      <small>Carte {i + 1}</small>
                    </span>
                    <span className="card-face card-front">
                      <span className="card-name">{card.name}</span>
                      <small>{card.description}</small>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {revealed.length < 3 && (
            <p className="next-hint">
              Touchez la carte de votre choix pour la retourner.
            </p>
          )}

          <div className="token-area">
            <button
              disabled={revealed.length !== 3}
              onClick={() => setTokenVisible(true)}
              className="coin"
              aria-label={
                tokenVisible ? 'Jeton révélé' : 'Révéler le jeton'
              }
            >
              {tokenVisible ? '✧' : '?'}
            </button>

            <p>
              {tokenVisible
                ? draw.token.text
                : revealed.length === 3
                  ? 'Les trois cartes sont révélées : vous pouvez découvrir le jeton.'
                  : 'Révélez les trois cartes avant le jeton.'}
            </p>

            {tokenVisible && (
              <div className="actions">
                <button
                  className="secondary"
                  onClick={() =>
                    setDraw(current =>
                      current ? { ...current, token: drawToken() } : current,
                    )
                  }
                >
                  Relancer le jeton
                </button>
                <button onClick={() => setScreen('summary')}>
                  Voir le récapitulatif
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {screen === 'summary' && draw && (
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
          <button onClick={() => setScreen('booster')}>Nouveau booster</button>
          <small>Historique local prévu pour la phase 2.</small>
        </section>
      )}

      <footer>Résilience · Prototype privé · Consentement avant tout</footer>
    </main>
  );
}