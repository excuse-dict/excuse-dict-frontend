import {usePage} from "@/global_components/page/usePage";
import NextPageButton from "@/global_components/page/NextPageButton";

export default function PageContainer({page}: {
    page: ReturnType<typeof usePage>
}) {
    const {currentPage, setCurrentPage, totalPages} = page;

    const maxPagesRadius = 5;

    const movePage = (page: number) => {
        if (page < 0 || page >= totalPages) return

        setCurrentPage(page);
    }

    const getPages = () => {
        // 현재 페이지를 중심으로 좌우로 radius만큼 펼침
        const leftEnd = Math.max(currentPage - maxPagesRadius, 0);
        // 왼쪽이 모자라면 잘린 만큼 오른쪽에 보상
        const leftLost = Math.abs(Math.min(0, currentPage - maxPagesRadius));

        const rightEnd = Math.min(currentPage + maxPagesRadius + leftLost, totalPages - 1);
        // 여기도 오른쪽이 모자란 만큼 왼쪽에 보상
        const rightLost = Math.abs(Math.min(0, totalPages - 1 - (currentPage + maxPagesRadius + leftLost)));

        // 오른쪽 모자란 만큼 왼쪽 다시 보정
        const finalLeftEnd = Math.max(leftEnd - rightLost, 0);

        return Array.from({length: rightEnd - finalLeftEnd + 1}, (_, i) => finalLeftEnd + i);
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