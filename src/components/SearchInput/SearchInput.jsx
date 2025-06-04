import "./SearchInput.css";

function SearchInput({ query, onQueryChange }) {
  return (
    <input
      type="text"
      placeholder="Search keywords in GU/EN (સત્સંગ, satsang)"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchInput;