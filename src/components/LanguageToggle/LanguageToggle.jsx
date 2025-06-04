import "./LanguageToggle.css";

const LanguageToggle = ({ language, onToggle }) => {
  return (
    <div className="language-toggle">
      <button
        className={language === 'gu' ? 'active' : ''}
        onClick={() => onToggle('gu')}
      >
        GU
      </button>
      <button
        className={language === 'en' ? 'active' : ''}
        onClick={() => onToggle('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
