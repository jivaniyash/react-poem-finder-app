import "./HighlightMatch.css"

const HighlightMatch = (text, query) => {
  if (!query) return text;

  // 1. Split the query into words and normalize them
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 2);

  if (queryWords.length === 0) return text;

  // 2. Find words from query that actually exist in the text
  const presentWords = queryWords.filter((word) =>
    text.toLowerCase().includes(word)
  );

  if (presentWords.length === 0) return text;

  // 3. Build regex to highlight only the matched words in the verse
  const regex = new RegExp(`(${presentWords.join("|")})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) 
    ? <mark key={i} className="highlight">{part}</mark>
    : part
  );
};

export default HighlightMatch;
