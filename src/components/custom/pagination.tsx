import React, { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis
}
    from "@/components/ui/pagination"

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const CustomPagination = ({
    totalPages,
    currentPage,
    onPageChange
}: PaginationProps) => {

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3; // Number of pages to show around the current page

        // Previous button
        if (currentPage > 1) {
            pageNumbers.push(
                <PaginationItem key="prev">
                    <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
                </PaginationItem>
            );
        }

        // First page (always shown)
        pageNumbers.push(
            <PaginationItem key={1}>
                <PaginationLink
                    href="#"
                    onClick={() => onPageChange(1)}
                    isActive={currentPage === 1}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Ellipsis for gap after first page
        if (currentPage > maxPagesToShow + 1) {
            pageNumbers.push(
                <PaginationItem key="dots1">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Pages around the current page
        const startPage = Math.max(2, currentPage - 1); // Ensure the range doesn't go below 2
        const endPage = Math.min(totalPages - 1, currentPage + 1); // Ensure the range doesn't exceed totalPages - 1

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        onClick={() => onPageChange(i)}
                        isActive={currentPage === i}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Ellipsis for gap before last page
        if (currentPage < totalPages - maxPagesToShow) {
            pageNumbers.push(
                <PaginationItem key="dots2">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        // Last page (always shown if more than 1 page)
        if (totalPages > 1) {
            pageNumbers.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        onClick={() => onPageChange(totalPages)}
                        isActive={currentPage === totalPages}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Next button
        if (currentPage < totalPages) {
            pageNumbers.push(
                <PaginationItem key="next">
                    <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)}/>
                </PaginationItem>
            );
        }

        return pageNumbers;
    };

    return (
        <Pagination className="justify-end">
            <PaginationContent>{renderPageNumbers()}</PaginationContent>
        </Pagination>
    );

};

export default CustomPagination;
