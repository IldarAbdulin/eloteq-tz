interface PaginationControlsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

export const PaginationControls = ({
  currentPage,
  onPageChange,
  disablePrev,
  disableNext,
  prevLabel = 'Назад',
  nextLabel = 'Далее',
  className = '',
}: PaginationControlsProps) => {
  return (
    <div className={`flex items-center justify-center gap-2 mt-6 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disablePrev}
        className="px-3 py-1 cursor-pointer bg-gray-500 text-white rounded disabled:opacity-50 hover:bg-gray-600"
      >
        {prevLabel}
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableNext}
        className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
      >
        {nextLabel}
      </button>
    </div>
  );
};
