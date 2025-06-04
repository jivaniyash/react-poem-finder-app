import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  poemsPerPage,
  onPageChange,
  onPerPageChange,
}) => {
  return (
    <div className="pagination">
      <div className="pagination-buttons">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="pagination-controls">
        <label>
          Poems per page:
          <select
            value={poemsPerPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            {[3, 5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Pagination;
