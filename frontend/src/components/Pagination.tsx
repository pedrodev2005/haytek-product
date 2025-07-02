import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <MuiPagination
      count={pageCount}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      color="primary"
      sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
