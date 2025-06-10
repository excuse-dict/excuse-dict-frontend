import {usePage} from "@/global_components/page/usePage";
import NextPageButton from "@/app/excuses/components/NextPageButton";

export default function PageContainer({page}: {
    page: ReturnType<typeof usePage>
}) {
    const {currentPage, setCurrentPage, totalPages} = page;

    const maxPagesRadius = 3;

    const movePage = (page: number) => {
        if (page < 0 || page >= totalPages) return

        setCurrentPage(page);
    }

    const getPages = () => {
        // 현재 페이지를 중심으로
        const leftEnd = Math.max(currentPage - maxPagesRadius, 0);
        const rightAddition = maxPagesRadius - (currentPage - leftEnd);

        const rightEnd = Math.min(currentPage + rightAddition, totalPages - 1);

        //console.log({currentPage, totalPage, leftEnd, rightEnd});

        return Array.from({length: rightEnd - leftEnd + 1}, (_, i) => leftEnd + i);
    }

    if(totalPages === 0) return <></>

    return (
        <div className="flex justify-center space-x-2 pb-8">
            <NextPageButton
                pageToMove={0}
                onClick={movePage}
                isDisabled={currentPage === 0}
            >{'<<'}</NextPageButton>
            <NextPageButton
                pageToMove={currentPage - 1}
                onClick={movePage}
                isDisabled={currentPage === 0}
            >{'<'}</NextPageButton>
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

            <NextPageButton
                pageToMove={currentPage + 1}
                onClick={movePage}
                isDisabled={currentPage === totalPages - 1}
            >{'>'}</NextPageButton>
            <NextPageButton
                pageToMove={totalPages - 1}
                onClick={movePage}
                isDisabled={currentPage === totalPages - 1}
            >{'>>'}</NextPageButton>
        </div>
    );
}