import { useState } from 'react';
import { SEASONAL_THEMES, useSeasonalTheme } from '../context/SeasonalThemeContext';

export default function SeasonalMascot() {
  const { theme } = useSeasonalTheme();
  const [tumbling, setTumbling] = useState(false);
  const [message, setMessage] = useState('Poke the holiday visitor');
  const selected = SEASONAL_THEMES.find((item) => item.id === theme)!;

  const poke = () => {
    if (tumbling) return;
    setTumbling(true);
    setMessage('Oops! Back on my feet…');
    window.setTimeout(() => {
      setTumbling(false);
      setMessage('Poke the holiday visitor');
    }, 1500);
  };

  return (
    <div className="seasonal-visitor">
      <button
        type="button"
        className={`mascot-stage ${tumbling ? 'is-tumbling' : ''}`}
        data-character={theme}
        onClick={poke}
        onPointerDown={() => { if (navigator.vibrate) navigator.vibrate(18); }}
        aria-label={`Poke the ${selected.character}. ${tumbling ? 'They are getting back up.' : 'They will tumble and stand back up.'}`}
      >
        <span className="mascot-aura" aria-hidden />
        <span className="mascot-shadow" aria-hidden />
        <img
          className="mascot-character"
          src={`/images/seasonal/${theme}.webp`}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
        <span className="mascot-sparkle sparkle-one" aria-hidden>✦</span>
        <span className="mascot-sparkle sparkle-two" aria-hidden>✧</span>
      </button>
      <span className="mascot-label" aria-live="polite">{message}</span>
    </div>
  );
}
