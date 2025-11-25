import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "../index.css"

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const visiblePages = () => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
  };

  return (
    <Pagination className="custom-pagination mt-4 mb-2 justify-content-center">
      <Pagination.Prev
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous"
      >
        <span className="arrow-icon">{'‹'}</span>
      </Pagination.Prev>

      {visiblePages().map((page, idx) =>
        typeof page === "number" ? (
          <Pagination.Item
            key={page}
            active={page === current}
            onClick={() => page !== current && onChange(page)}
            aria-current={page === current ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis
            key={idx}
            aria-hidden="true"
            className="custom-ellipsis"
          />
        )
      )}

      <Pagination.Next
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next"
      >
        <span className="arrow-icon">{'›'}</span>
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;