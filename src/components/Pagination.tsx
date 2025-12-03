interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationPages(current: number, total: number, maxPages = 7) {
  const pages: (number | string)[] = [];
  const half = Math.floor(maxPages / 2);

  if (total <= maxPages) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    let start = Math.max(2, current - half);
    let end = Math.min(total - 1, current + half);

    pages.push(1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < total - 1) pages.push("...");

    pages.push(total);
  }

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 mt-6 mb-12 flex-wrap">
      {/* Button for the first page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>

      {/* Button to the previous page*/}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {/* Button for the pages */}
      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded border ${
              p === currentPage
                ? "bg-red-600 text-white font-semibold border-red-600"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-2 py-1 text-gray-400">
            {p}
          </span>
        )
      )}

      {/* Button for the next page */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>

      {/* Button for the last page*/}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-40"
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
}
