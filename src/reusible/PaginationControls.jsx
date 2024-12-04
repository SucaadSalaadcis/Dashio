

import Pagination from 'react-bootstrap/Pagination';

import useLanguage from './useLanguage';

export default function PaginationControls({ currentPage, totalPages, pageS, setCurrentPage }) {

    const { t } = useLanguage();

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            <div className="justify-between mt-4 d-flex">
                <div>
                    <span className='text-sm md:text-lg'>
                        {t('pagin_text1')} {totalPages} {t('pagin_text2')} {pageS} {t('pagin_text3')} {currentPage} {t('pagin_text4')}   </span>
                </div>
                <Pagination className='ml-5'>
                    <Pagination.First
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </>
    );
};