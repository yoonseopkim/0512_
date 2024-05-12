import React from 'react';
import { Pagination } from 'react-bootstrap';

function MyPagination({ totalPages, currentRange, handlePageChange, handleRangeChange }) {
    return (
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentRange === 0} />
            <Pagination.Prev onClick={() => handleRangeChange(Math.max(0, currentRange - 10))}
                             disabled={currentRange === 0} />
            {Array.from({ length: Math.min(10, totalPages - currentRange) }, (_, idx) => (
                <Pagination.Item
                    key={currentRange + idx + 1}
                    active={currentRange === idx}
                    onClick={() => handlePageChange(currentRange + idx + 1)}>
                    {currentRange + idx + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handleRangeChange(currentRange + 10)}
                             disabled={currentRange + 10 >= totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)}
                             disabled={currentRange + 10 >= totalPages} />
        </Pagination>
    );
}

export default MyPagination;
