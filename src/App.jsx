import React, { useState, useEffect } from "react";

import { poems } from "./data";
import SearchInput from "./components/SearchInput/SearchInput";
import PoemList from "./components/PoemList/PoemList";
import Pagination from "./components/Pagination/Pagination";
import PoemCount from "./components/PoemCount/PoemCount";
import LanguageToggle from "./components/LanguageToggle/LanguageToggle";
import { initializeSearch, searchPoems } from "./utils/filterPoems";

import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [poemsPerPage, setPoemsPerPage] = useState(5);
  const [filteredPoems, setFilteredPoems] = useState(poems);
  const [globalLang, setGlobalLang] = useState("en");
  const [langMap, setLangMap] = useState({});

  useEffect(() => {
    initializeSearch(poems);
    setFilteredPoems(poems);
  }, []);

  useEffect(() => {
    const result = searchPoems(query);
    setFilteredPoems(result);
    setCurrentPage(1);
  }, [query]);

  const totalPoems = filteredPoems.length;
  const totalPages = Math.ceil(totalPoems / poemsPerPage);

  const currentPoems = filteredPoems.slice(
    (currentPage - 1) * poemsPerPage,
    currentPage * poemsPerPage
  );

  const toggleGlobalLang = () => {
    const nextLang = globalLang === 'en' ? 'gu' : 'en';
    setGlobalLang(nextLang);
    setLangMap({}); // reset all overrides
  };


  return (
    <div className="container">
      <h1>Gujarati Poem Search</h1>
      <div className="description"> Search and explore Gujarati spiritual poems with English transliterations.</div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LanguageToggle
          language={globalLang}
          onToggle={toggleGlobalLang}
        />
      </div>

      <SearchInput
        query={query}
        onQueryChange={(q) => {
          setQuery(q);
          setCurrentPage(1);
        }}
      />

      <PoemCount totalPoems={totalPoems} />

      <PoemList
        poems={currentPoems}
        query={query}
        globalLang={globalLang}
        langMap={langMap}
        setLangMap={setLangMap}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        poemsPerPage={poemsPerPage}
        onPageChange={setCurrentPage}
        onPerPageChange={(n) => {
          setPoemsPerPage(n);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export default App;