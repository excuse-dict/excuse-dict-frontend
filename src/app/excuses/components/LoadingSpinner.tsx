export default function LoadingSpinner(){
    return (
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center p-4 min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-600">게시물을 불러오는 중...</p>
            </div>
        </div>
    );
}