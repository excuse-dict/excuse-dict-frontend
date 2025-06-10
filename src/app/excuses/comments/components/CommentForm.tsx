export default function CommentForm({ commentInput, setCommentInput, handleCommentSubmit }: {
    commentInput: string,
    setCommentInput: (value: string) => void,
    handleCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}){
    return (
        <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex items-start space-x-3">
                <div
                    className="w-8 h-8 bg-[var(--strong-purple)] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    나
                </div>
                <div className="flex-1">
                                <textarea
                                    value={commentInput}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentInput(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none transition-all duration-200
                                             focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-[var(--strong-purple)]
                                             hover:border-purple-300 bg-white shadow-sm
                                             placeholder:text-gray-400"
                                    rows={3}
                                    placeholder="댓글을 입력하세요..."
                                    onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => e.stopPropagation()}
                                />
                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            disabled={!commentInput.trim()}
                            className="global_button !bg-[var(--strong-purple)] !text-white px-6 py-2.5 rounded-lg disabled:from-gray-300 disabled:to-gray-400
                                                 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium
                                                 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
                        >
                            댓글 작성
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}