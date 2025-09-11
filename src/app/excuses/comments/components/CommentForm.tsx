export default function CommentForm({ commentInput, setCommentInput, handleCommentSubmit, hideProfileImage = false }: {
    commentInput: string,
    setCommentInput: (value: string) => void,
    handleCommentSubmit: () => void,
    hideProfileImage?: boolean,
}){
    return (
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleCommentSubmit();
        }} className="mb-6 w-full">
            <div className="flex items-start space-x-3">
                {/*프로필 이미지*/}
                <div
                    className={hideProfileImage ? "invisible" : "" + "w-8 h-8 bg-[var(--strong-purple)] rounded-full flex items-center justify-center text-white font-semibold text-sm"}>
                    나
                </div>
                <div className="flex-1">
                    {/*댓글 입력창*/}
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
                        {/*댓글 작성 버튼*/}
                        <button
                            type="submit"
                            disabled={!commentInput.trim()}
                            className={`global_button !text-white px-6 py-2.5 rounded-lg disabled:from-gray-300 disabled:to-gray-400
                                                 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium
                                                 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95
                                                 ${!commentInput.trim() ? '!bg-gray-300' : '!bg-[var(--strong-purple)]'}`}
                        >
                            댓글 작성
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}