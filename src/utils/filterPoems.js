// export const filterPoems = (poems, query) => {
//   const lower = query.toLowerCase();

//   return poems
//     .map(poem => {
//       const verses = [...(poem.verses_gu || []), ...(poem.verses_en || [])];
//       let verseMatch = false, verseStarts = false;

//       for (const v of verses) {
//         const l = v.toLowerCase();
//         if (l.includes(lower)) {
//           verseMatch = true;
//           if (l.startsWith(lower)) {
//             verseStarts = true;
//             break;
//           }
//         }
//       }

//       console.log(poem.id, { verseMatch, verseStarts });

//       let rank = 3;
//       if (verseStarts) rank = 2;
//       else if (verseMatch) rank = 2.5;

//       return { poem, rank };
//     })
//     .filter(({ rank }) => rank < 3)
//     .sort((a, b) => a.rank - b.rank)
//     .map(({ poem }) => poem);
// };

import MiniSearch from 'minisearch';

let miniSearch;
let allPoems = []; //Safe reference for all poems

export const initializeSearch = (poems) => {
  allPoems = poems;
  miniSearch = new MiniSearch({
    fields: ['title_gu', 'title_en', 'verses_gu', 'verses_en'],
    storeFields: ['id', 'title_gu', 'title_en', 'author', 'verses_gu', 'verses_en'],
    searchOptions: {
      fuzzy: 0.2,
      prefix: true,
      boost: { title_gu: 2, title_en: 2 },
    },
  });

  miniSearch.addAll(poems);
};

export const searchPoems = (query) => {
  if (!query.trim()) return allPoems; //Use local copy instead of _documents
  return miniSearch.search(query); // returns full poem objects from storeFields
};
