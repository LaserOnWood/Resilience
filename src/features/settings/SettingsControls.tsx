interface SettingsControlsProps {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  onToggleSound: () => void;
  onToggleAnimations: () => void;
}

export default function SettingsControls({
  soundEnabled,
  animationsEnabled,
  onToggleSound,
  onToggleAnimations,
}: SettingsControlsProps) {
  return (
    <div className="header-controls" aria-label="Préférences">
      <button
        type="button"
        className="sound-toggle footer-toggle"
        onClick={onToggleSound}
        aria-pressed={soundEnabled}
      >
        {soundEnabled ? '♪ Son activé' : '♪ Son désactivé'}
      </button>
      <button
        type="button"
        className="sound-toggle footer-toggle"
        onClick={onToggleAnimations}
        aria-pressed={!animationsEnabled}
      >
        {animationsEnabled ? 'Animations activées' : 'Animations désactivées'}
      </button>
    </div>
  );
}
