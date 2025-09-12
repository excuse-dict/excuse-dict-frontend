import {ReplyInterface, UpdateReplyDto, useReply} from "@/app/excuses/comments/hooks/useReply";
import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {apiPatch} from "@/axios/requests/patch/apiPatch";
import {EP_UPDATE_OR_DELETE_REPLY} from "@/app/constants/constants";
import {useEdit} from "@/app/excuses/comments/hooks/useEdit";

export default function Reply({ reply, replyHook }: {
    reply: ReplyInterface,
    replyHook: ReturnType<typeof useReply>
}) {

    const { updateReply, deleteReply, voteToReply } = replyHook;
    const { isOnEditing, setOnEditing, editInput, setEditInput,
        editingTextareaRef, editingButtonRef, handleStartEdit} = useEdit(reply.content);

    // 수정 요청 전송
    const handleSubmitEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();

        if(reply.content === editInput) {
            setOnEditing(false);
            return;
        };

        apiPatch({
            endPoint: EP_UPDATE_OR_DELETE_REPLY(reply.id),
            body: {
                comment: editInput,
            },
            onSuccess: () => {
                setOnEditing(false);
                // 댓글 상태 업데이트
                updateReply({
                    replyId: reply.id,
                    updatedData: {
                        content: editInput,
                        modifiedAt: new Date().toDateString().slice(0, 19),
                    }
                });
            }
        })
    }

    const handleDelete = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();
        deleteReply(reply.id);
    }

    return (
        <div
            className="flex items-start space-x-3 p-4 pl-8 bg-gray-50 rounded-lg transition-colors duration-200">
            <p>⤷</p>
            {/*프로필 이미지*/}
            <div
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {reply.author?.nickname?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    {/*작성자 닉네임*/}
                    <span className="font-semibold text-gray-800 text-sm">
                        {reply.author?.nickname || '익명'}
                    </span>
                    {/*작성일시*/}
                    <span className="text-xs text-gray-500">
                        {getDatetimeFormat(reply.createdAt)}
                        {reply.createdAt !== reply.modifiedAt ? " (수정됨)" : ''}
                    </span>
                </div>
                {isOnEditing ?
                    /*답글 편집란*/
                    <textarea
                        ref={editingTextareaRef}
                        className="px-3 py-1 w-full border-blue-100 border-2 text-xs rounded-md transition-colors resize-none"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    ></textarea>
                    :
                    /*답글 내용*/
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {reply.content}
                    </p>
                }

                <div className="flex justify-between">
                    <div className={'flex gap-2 font-light text-sm'}>
                        {/*추천 버튼*/}
                        <button
                            className={`${reply.myVote?.voteType === "UPVOTE" ? 'text-green-500 font-bold' : ''}`}
                            onClick={() => voteToReply({ reply:reply, voteType: "UPVOTE"})}
                        >{`👍${reply.upvoteCount}`}</button>
                        {/*비추천 버튼*/}
                        <button
                            className={`${reply.myVote?.voteType === "DOWNVOTE" ? 'text-red-500 font-bold' : ''}`}
                            onClick={() => voteToReply({ reply: reply, voteType: "DOWNVOTE" })}
                        >{`👎${reply.downvoteCount}`}</button>
                        <p>💬</p>
                        <p>{reply.replyCount}</p>
                    </div>
                    <div className="flex gap-2" ref={isOnEditing ? editingButtonRef : undefined}>
                        {isOnEditing ?
                            <>
                                {/*수정 완료 버튼*/}
                                <p
                                    className="text-xs font-bold p-1 rounded-xl text-blue-400 cursor-pointer"
                                    onClick={(e) => handleSubmitEdit(e)}
                                >완료</p>
                                {/*수정 취소 버튼*/}
                                <p
                                    className="text-xs font-bold p-1 rounded-2xl text-red-400 cursor-pointer"
                                    onClick={(e) => {
                                        setOnEditing(false);
                                        e.stopPropagation();
                                    }}
                                >취소</p>
                            </>
                            :
                            <>
                                {/*수정 버튼*/}
                                <p
                                    className="text-xs p-1 rounded-xl text-blue-400 cursor-pointer"
                                    onClick={(e) => handleStartEdit(e)}
                                >수정</p>
                                {/*삭제 버튼*/}
                                <p
                                    className="text-xs p-1 rounded-2xl text-red-400 cursor-pointer"
                                    onClick={(e) => handleDelete(e)}
                                >삭제</p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}