import {usePage} from "@/global_components/page/usePage";

export default function PageContainer({ page }: {
    page: ReturnType<typeof usePage>
}){
    const { currentPage, setCurrentPage } = page;

    return (
        <div className="flex justify-center space-x-2 pb-8">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                이전
            </button>
            <span className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                    {currentPage}
                </span>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
                다음
            </button>
        </div>
    );
}