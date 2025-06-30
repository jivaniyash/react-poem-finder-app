import { useState } from "react";
import "./PoemList.css";

import PoemMetaData from "../PoemMetaData/PoemMetaData";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import HighlightMatch from "../HighlightMatch/HighlightMatch";

const PoemList = ({ poems, query, globalLang, langMap, setLangMap }) => {
  const [selectedPoem, setSelectedPoem] = useState(null);
  const verseEndings = [',', ';', ',', '.']

  const handleToggle = (poemId) => {
    setLangMap((prev) => {
      const current = prev[poemId] ?? globalLang; // use fallback if not overridden
      const next = current === 'gu' ? 'en' : 'gu';
      return { ...prev, [poemId]: next };
    });
  };

  return (
    <div className="poem-list">
      {poems.map((poem) => {
        const lang = langMap[poem.id] || globalLang;

        return (
          <div
            key={poem.id}
            className="poem"
          >
            <div
              className="poem-verses"
              onClick={() => setSelectedPoem(poem)}
              style={{ cursor: "pointer" }}
            >
              {Array.from({ length: Math.ceil(poem[`verses_${lang}`]?.length / 2) }).map((_, rowIndex) => {
                const verse1 = poem[`verses_${lang}`][rowIndex * 2];
                const verse2 = poem[`verses_${lang}`][rowIndex * 2 + 1];

                return (
                  <div key={rowIndex} className="poem-line-row">
                    {verse1 && (
                      <div className="poem-line">
                        {HighlightMatch(verse1, query)}{verseEndings[rowIndex * 2]}
                      </div>
                    )}
                    {verse2 && (
                      <div className="poem-line">
                        {HighlightMatch(verse2, query)}{verseEndings[rowIndex * 2 + 1]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <LanguageToggle
                language={lang}
                onToggle={(newLang) => handleToggle(poem.id, newLang)}
              />
            </div>
          </div>
        );
      })}

      {selectedPoem && (
        <PoemMetaData poem={selectedPoem} onClose={() => setSelectedPoem(null)} />
      )}
    </div>
  );
};

export default PoemList;