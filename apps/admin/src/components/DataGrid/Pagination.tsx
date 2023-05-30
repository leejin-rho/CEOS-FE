import { ArrowLeft, ArrowRight } from '@admin/assets/Arrow';
import { theme, Flex } from '@ceos-fe/ui';
import styled from '@emotion/styled';

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onChangePage: (newPage: number) => void;
}

/**
 * @param {number} total: 전체 데이터 개수
 * @param {number} page: 현재 페이지 넘버
 * @param {number} pageSize: 현재 페이지 크기
 * @param {Function} onChangePage: 페이지 넘버 수정
 */
export const Pagination = ({
  total,
  page,
  pageSize,
  onChangePage,
}: PaginationProps) => {
  const totalPageCount = Math.ceil(total / pageSize);
  const lastPage = Math.ceil(page / 5) * 5;
  const startPage = lastPage - 4;
  const endPage = lastPage < totalPageCount ? lastPage : totalPageCount;

  const handlePrevPage = () => {
    if (startPage === 1) onChangePage(1);
    else onChangePage(startPage - 5);
  };

  const handleNextPage = () => {
    if (lastPage === endPage) onChangePage(lastPage + 1);
    else onChangePage(endPage);
  };

  return (
    <Flex webGap={8}>
      <ArrowButton onClick={handlePrevPage}>
        <ArrowLeft />
      </ArrowButton>
      {Array.from(
        new Array(endPage - startPage + 1),
        (_, i) => startPage + i,
      ).map((pageNumber) => (
        <Button
          key={pageNumber}
          isSelected={pageNumber === page}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <ArrowButton onClick={handleNextPage}>
        <ArrowRight />
      </ArrowButton>
    </Flex>
  );
};

const Button = styled.button<{ isSelected: boolean }>`
  width: 28px;
  height: 28px;

  box-sizing: border-box;

  border-radius: 4px;
  border: ${({ isSelected }) =>
    isSelected
      ? `1px solid ${theme.palette.Admin.DeepNavy}`
      : '1px solid #e2e2e2'};
  background-color: ${theme.palette.White};
  color: ${({ isSelected }) =>
    isSelected ? theme.palette.Admin.DeepNavy : '#e2e2e2'};
`;
const ArrowButton = styled.button`
  width: 28px;
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 4px;
  background-color: ${theme.palette.Admin.DeepNavy};
`;
