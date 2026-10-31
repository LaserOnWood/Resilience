import type { Draw } from '../../types/game';
import { getCardPresentation } from '../cards/cardPresentation';

interface HistoryFeatureProps {
  history: Draw[];
  onBack: () => void;
  onDelete: () => void;
}

export default function HistoryFeature({ history, onBack, onDelete }: HistoryFeatureProps) {
  return (
    <section className="panel wide history-screen">
      <p className="eyebrow">Collection privée</p>
      <h1>Mon historique</h1>
      <p>Retrouvez vos précédents tirages enregistrés sur cet appareil.</p>
      {history.length === 0 ? (
        <div className="history-empty">
          <span aria-hidden="true">✧</span>
          <h2>Votre collection vous attend</h2>
          <p>Terminez votre premier booster pour inaugurer votre historique personnel.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <article className="history-item" key={item.id}>
              <div className="history-item-header">
                <span className="history-number">✦ TIRAGE Nº {history.length - index}</span>
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleString('fr-FR', {
                    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </time>
              </div>
              <div className="history-cards">
                {item.cards.map(card => (
                  <div className="history-card" key={card.id}>
                    <span className="history-card-category">{getCardPresentation(card).category}</span>
                    <strong>{card.name}</strong>
                    <small>{card.description}</small>
                  </div>
                ))}
              </div>
              <div className="history-token"><span aria-hidden="true">✧</span><p>{item.token.text}</p></div>
            </article>
          ))}
        </div>
      )}
      <div className="actions">
        <button onClick={onBack}>Retour à l'accueil</button>
        {history.length > 0 && <button className="secondary history-delete" onClick={onDelete}>Effacer l'historique</button>}
      </div>
      <small>Historique conservé uniquement dans ce navigateur, dans la limite de 50 tirages.</small>
    </section>
  );
}
