
import { useEffect, useRef, useState } from 'react';
import { playSound, unlockAudio } from './lib/sound';
import { createDraw, drawToken } from './lib/game';
import type { Draw } from './types/game';
import { getHistory, saveDraw, clearHistory } from './lib/history';
import TokenFeature from './features/token/TokenFeature';
import CardsRevealFeature from './features/cards/CardsRevealFeature';
import { getCardPresentation } from './features/cards/cardPresentation';
import BoosterFeature from './features/booster/BoosterFeature';
import HistoryFeature from './features/history/HistoryFeature';
import SummaryFeature from './features/cards/SummaryFeature';
import WelcomeFeature from './features/home/WelcomeFeature';
import RulesFeature from './features/home/RulesFeature';
import SettingsControls from './features/settings/SettingsControls';

type Screen = 'welcome' | 'rules' | 'booster' | 'reveal' | 'summary' | 'history';

export default function App() {
  const [adult, setAdult] = useState(
    () => sessionStorage.getItem('resilience-adult') === 'yes',
  );
  const [screen, setScreen] = useState<Screen>('welcome');
  const [draw, setDraw] = useState<Draw | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [fanSettled, setFanSettled] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const [history, setHistory] = useState<Draw[]>(() => getHistory());


  const [soundEnabled, setSoundEnabled] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    const saved = localStorage.getItem('resilience-animations');
    return saved === null
      ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : saved === 'enabled';
  });
  const soundEnabledRef = useRef(false);
  const soundTimers = useRef<number[]>([]);

  const clearSoundTimers = () => {
    soundTimers.current.forEach(window.clearTimeout);
    soundTimers.current = [];
  };

  useEffect(() => {
    return () => {
      soundTimers.current.forEach(window.clearTimeout);
    };
  }, []);

  const toggleSound = async () => {
    if (soundEnabledRef.current) {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
      clearSoundTimers();
      return;
    }

    try {
      await unlockAudio();
      soundEnabledRef.current = true;
      setSoundEnabled(true);
      playSound('sparkle');
    } catch {
      soundEnabledRef.current = false;
      setSoundEnabled(false);
    }
  };

  const toggleAnimations = () => {
    const next = !animationsEnabled;
    localStorage.setItem('resilience-animations', next ? 'enabled' : 'disabled');
    setAnimationsEnabled(next);
  };

  const scheduleSound = (name: 'tear' | 'sparkle', delay: number) => {
    const timer = window.setTimeout(() => {
      if (soundEnabledRef.current) playSound(name);
      soundTimers.current = soundTimers.current.filter(id => id !== timer);
    }, delay);

    soundTimers.current.push(timer);
  };


  
  const finishDraw = () => {
    if (!draw || revealed.length !== 3 || !tokenVisible) return;

    const updated = saveDraw(draw);
    setHistory(updated);
    setScreen('summary');
  };

  const deleteHistory = () => {
    const confirmed = window.confirm(
      'Supprimer définitivement tous les tirages enregistrés sur cet appareil ?'
    );

    if (!confirmed) return;

    clearHistory();
    setHistory([]);
  };

  const start = () => {
    if (opening) return;

    clearSoundTimers();

    setDraw(createDraw());
    setRevealed([]);
    setFanSettled(!animationsEnabled);
    setTokenVisible(false);

    if (animationsEnabled) {
      setOpening(true);
    } else {
      setOpening(false);
      setScreen('reveal');
    }

    if (soundEnabledRef.current) {
      playSound('foil');
      scheduleSound('tear', 850);
      scheduleSound('sparkle', 1450);
    }
  };


  
  const revealCard = (index: number) => {
    if (revealed.includes(index)) return;

    if (soundEnabledRef.current) {
      playSound('card');
    }

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
    <main className={`shell${animationsEnabled ? '' : ' animations-disabled'}`}>
      <header className="top">     


        
        <SettingsControls
          soundEnabled={soundEnabled}
          animationsEnabled={animationsEnabled}
          onToggleSound={toggleSound}
          onToggleAnimations={toggleAnimations}
        />
      </header>

      {screen === 'welcome' && (
        <WelcomeFeature
          historyCount={history.length}
          onStart={() => setScreen('rules')}
          onHistory={() => setScreen('history')}
        />
      )}

      {screen === 'rules' && (
        <RulesFeature
          onContinue={() => setScreen('booster')}
          onHome={() => setScreen('welcome')}
        />
      )}

      {screen === 'booster' && (
        <BoosterFeature
          opening={opening}
          onStart={start}
          onOpeningComplete={() => {
            setOpening(false);
            setScreen('reveal');
          }}
        />
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

          <CardsRevealFeature
            cards={draw.cards}
            revealed={revealed}
            fanSettled={fanSettled}
            onRevealCard={revealCard}
            onFanSettled={() => setFanSettled(true)}
          />

          {revealed.length < 3 && (
            <p className="next-hint">
              Touchez la carte de votre choix pour la retourner.
            </p>
          )}

          <TokenFeature
            canReveal={revealed.length === 3}
            tokenVisible={tokenVisible}
            token={draw.token}
            onReveal={() => setTokenVisible(true)}
            onReroll={() =>
              setDraw(current =>
                current ? { ...current, token: drawToken() } : current,
              )
            }
            onFinish={finishDraw}
          />
        </section>
      )}

      {screen === 'summary' && draw && (
        <SummaryFeature
          draw={draw}
          onNewBooster={() => setScreen('booster')}
          onHistory={() => setScreen('history')}
        />
      )}

{screen === 'history' && (
        <HistoryFeature
          history={history}
          onBack={() => setScreen('welcome')}
          onDelete={deleteHistory}
        />
      )}


      <footer>
        <button className="text-button" onClick={() => setScreen('rules')}>
          Règles et sécurité
        </button>

        <span>Résilience · Prototype privé · Consentement avant tout</span>
      </footer>
    </main>
  );
}
