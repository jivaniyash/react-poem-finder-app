import { useEffect } from "react";
import "./PoemMetaData.css";

const PoemMetaData = ({ poem, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="poem-meta-overlay" onClick={onClose}>
      <div className="poem-meta-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <strong>{poem.title_gu}</strong>
        <p><strong>Author:</strong> {poem.author}</p>
        <p><strong>Granth:</strong> {poem.granth}</p>
        <p><strong>Sub-Granth:</strong> {poem.sub_granth}</p>
      </div>
    </div>
  );
};

export default PoemMetaData;