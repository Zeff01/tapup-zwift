import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
}

const PrintCardPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-8">
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNumber)}
                    isActive={pageNumber === currentPage}
                    className={`select-none ${pageNumber === currentPage ? "bg-blue-500 hover:bg-blue-500 text-white" : ""}`}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            if (
              (pageNumber === 2 && currentPage > 3) ||
              (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return (
                <PaginationItem key={`ellipsis-${pageNumber}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
          })}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PrintCardPagination;
