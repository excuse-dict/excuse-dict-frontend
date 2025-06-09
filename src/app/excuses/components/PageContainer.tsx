import {usePage} from "@/global_components/page/usePage";

export default function PageContainer({page}: {
    page: ReturnType<typeof usePage>
}) {
    const {currentPage, setCurrentPage, totalPage} = page;

    const maxPagesRadius = 3;

    const handleNextPage = (dx: -1 | 1) => {
        const nextPage = currentPage + dx;

        if (nextPage < 0 || nextPage >= totalPage) return

        setCurrentPage(nextPage);
    }

    const getPages = () => {
        // 현재 페이지를 중심으로
        const leftEnd = Math.max(currentPage - maxPagesRadius, 0);
        const rightAddition = maxPagesRadius - (currentPage - leftEnd);

        const rightEnd = Math.min(currentPage + rightAddition, totalPage - 1);

        console.log({currentPage, totalPage, leftEnd, rightEnd});

        return Array.from({length: rightEnd - leftEnd + 1}, (_, i) => leftEnd + i);
    }

    return (
        <div className="flex justify-center space-x-2 pb-8">
            <button
                onClick={() => handleNextPage(-1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                이전
            </button>
            {getPages().map((page, index) => {
                return (
                    <button
                        key={index}
                        className={`global_button px-4 py-2 rounded-lg border ${page === currentPage
                            ? '!bg-[var(--strong-purple)] text-white border-[var(--strong-purple)]'
                            : '!bg-white text-[var(--s|trong-purple)] border-[var(--strong-purple)] hover:bg-purple-50'} font-semibold cursor-pointer transition-colors`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page + 1}
                    </button>
                );
            })}

            <button
                onClick={() => handleNextPage(1)}
                disabled={currentPage === totalPage - 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
                다음
            </button>
        </div>
    );
}