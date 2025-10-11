export default function NextPageButton({ pageToMove, onClick, isDisabled, children }: {
    pageToMove: number,
    onClick: (value: number) => void,
    isDisabled: boolean,
    children: React.ReactNode,
}){
    return (
        <button
            onClick={() => onClick(pageToMove)}
            disabled={isDisabled}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            {children}
        </button>
    );
}