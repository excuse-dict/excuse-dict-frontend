import {usePage} from "@/global_components/page/usePage";

export default function PageContainer({page}: {
    page: ReturnType<typeof usePage>
}) {
    const {currentPage, setCurrentPage, totalPage} = page;

    const maxPagesRadius = 3;

    const handleClick = (dx: -1 | 1) => {
        const nextPage = currentPage + dx;

        if (nextPage < 0 || nextPage >= totalPage) return

        setCurrentPage(nextPage);
    }

    const getPages = () => {
        // 현재 페이지를 중심으로
        const leftEnd = Math.max(currentPage - maxPagesRadius, 0);
        const rightAddition = maxPagesRadius - (currentPage - leftEnd);

        const rightEnd = Math.min(currentPage + rightAddition, totalPage);

        return Array.from({length: rightEnd - leftEnd + 1}, (_, i) => leftEnd + i);
    }

    return (
        <div className="flex justify-center space-x-2 pb-8">
            <button
                onClick={() => handleClick(-1)}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                이전
            </button>
            {getPages().map((page, index) => {
                return (
                    <span
                        key={index}
                        className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-[var(--strong-purple)]' : 'bg-[var(--purple-grey)]'} text-white font-semibold`}>
                        {page + 1}
                    </span>
                );
            })}

            <button
                onClick={() => handleClick(1)}
                disabled={currentPage === totalPage - 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
                다음
            </button>
        </div>
    );
}