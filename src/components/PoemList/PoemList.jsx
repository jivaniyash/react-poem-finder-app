import React, { useState } from "react";
import "./PoemList.css";

import PoemMetaData from "../PoemMetaData/PoemMetaData";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import highlightMatch from "./highlightMatch";

const PoemList = ({ poems, query, globalLang, langMap, setLangMap }) => {
  const [selectedPoem, setSelectedPoem] = useState(null);
  const verseEndings = [',', ';', ',', '.']
  // const [langMap, setLangMap] = useState({}); /{ poemId: 'gu' | 'en' }/ 

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
              {poem[`verses_${lang}`]?.map((line, i) => (
                <div key={i} className="poem-line">
                  {highlightMatch(line, query)}{verseEndings[i]}
                </div>
              ))}
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