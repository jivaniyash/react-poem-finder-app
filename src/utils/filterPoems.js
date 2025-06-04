export const filterPoems = (poems, query) => {
  const lower = query.toLowerCase();

  return poems
    .map((poem) => {
      const titleMatch =
        poem.title_gu?.toLowerCase().includes(lower) ||
        poem.title_en?.toLowerCase().includes(lower);

      const versesMatch =
        poem.verses_gu?.slice(1).some((v) => v.toLowerCase().includes(lower)) ||
        poem.verses_en?.slice(1).some((v) => v.toLowerCase().includes(lower));

      return {
        poem,
        rank: titleMatch ? 1 : versesMatch ? 2 : 3,
      };
    })
    .filter(({ rank }) => rank < 3)
    .sort((a, b) => {
      const titleA = a.poem.title_gu || a.poem.title_en;
      const titleB = b.poem.title_gu || b.poem.title_en;
      return a.rank !== b.rank
        ? a.rank - b.rank
        : titleA.localeCompare(titleB, "gu");
    })
    .map(({ poem }) => poem);
};
