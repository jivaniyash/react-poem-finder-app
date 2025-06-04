const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase().includes(query.toLowerCase())
      ? <mark key={i} className="highlight">{part}</mark>
      : part
  );
};

export default highlightMatch;
