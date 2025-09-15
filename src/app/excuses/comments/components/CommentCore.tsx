import {getDatetimeFormat} from "@/lib/TimeHelper";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {VoteType} from "@/app/excuses/votes/VoteInterface";
import {useComment} from "@/app/excuses/comments/hooks/useComment";
import React, {useEffect, useRef, useState} from "react";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {apiPatch} from "@/axios/requests/patch/apiPatch";
import {EP_UPDATE_OR_DELETE_COMMENT} from "@/app/constants/constants";
import {useEdit} from "@/app/excuses/comments/hooks/useEdit";

export default function CommentCore({ comment, commentHook, toggleRepliesExpanded }: {
    comment: CommentInterface,
    commentHook: ReturnType<typeof useComment>
    toggleRepliesExpanded: () => void,
}){

    const { memberId } = useAuthState();
    const { updateComment, deleteComment, voteToComment } = commentHook;
    const { isOnEditing, setOnEditing, editInput, setEditInput,
        editingTextareaRef, editingButtonRef, handleStartEdit} = useEdit(comment.content);
    
    const handleDelete = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {

        deleteComment(comment.id);
        e.stopPropagation();
    }

    const handleVote = (
        voteType: VoteType,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {

        /*console.log("memberId: ", memberId);
        console.log("comment: ", comment);*/

        if (!memberId) {
            askToLogin();
            return;
        }

        voteToComment({
            comment: comment,
            memberId: memberId,
            voteType: voteType,
        });

        // 클릭 이벤트 전파 방지
        e.stopPropagation();
    }


    // 수정 요청 전송
    const handleSubmitEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();

        if(comment.content === editInput) {
            setOnEditing(false);
            return;
        };

        apiPatch({
            endPoint: EP_UPDATE_OR_DELETE_COMMENT(comment.id),
            body: {
                comment: editInput,
            },
            onSuccess: () => {
                setOnEditing(false);
                // 댓글 상태 업데이트
                updateComment({
                    commentId: comment.id,
                    updatedData: {
                        content: editInput,
                        modifiedAt: new Date().toDateString().slice(0, 19),
                    }
                });
            }
        })
    }

    return (
        <div
            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            onClick={toggleRepliesExpanded}
        >
            {/*프로필 이미지*/}
            <div
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {comment.author?.nickname?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                    {/*작성자 닉네임*/}
                    <span className="font-semibold text-gray-800 text-sm">
                        {comment.author?.nickname || '익명'}
                    </span>
                    {/*작성일시*/}
                    <span className="text-xs text-gray-500">
                        {getDatetimeFormat(comment.createdAt)}
                        {comment.createdAt !== comment.modifiedAt ? " (수정됨)" : ''}
                    </span>
                </div>
                {isOnEditing ?
                    /*댓글 편집란*/
                    <textarea
                        ref={editingTextareaRef}
                        className="px-3 py-1 w-full border-blue-100 border-2 text-xs rounded-md transition-colors resize-none"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    ></textarea>
                    /*댓글 내용*/
                    : <p className="text-gray-700 text-sm leading-relaxed">
                        {comment.content}
                    </p>
                }
                <div className="flex justify-between">
                    <div className={'flex gap-2 font-light text-sm'}>
                        {/*추천 버튼*/}
                        <button
                            className={`${comment.myVote?.voteType === "UPVOTE" ? 'text-green-500 font-bold' : ''}`}
                            onClick={(e) => handleVote("UPVOTE", e)}
                        >{`👍${comment.upvoteCount}`}</button>
                        {/*비추천 버튼*/}
                        <button
                            className={`${comment.myVote?.voteType === "DOWNVOTE" ? 'text-red-500 font-bold' : ''}`}
                            onClick={(e) => handleVote("DOWNVOTE", e)}
                        >{`👎${comment.downvoteCount}`}</button>
                        <p>💬</p>
                        <p>{comment.replyCount}</p>
                    </div>
                    {comment.author?.id !== memberId ? <></> :
                        <div className="flex gap-2" ref={isOnEditing ? editingButtonRef : undefined}>
                            {isOnEditing ?
                                <>
                                    {/*수정 완료 버튼*/}
                                    <p
                                        className="text-xs font-bold p-1 rounded-xl text-blue-400"
                                        onClick={(e) => handleSubmitEdit(e)}
                                    >완료</p>
                                    {/*수정 취소 버튼*/}
                                    <p
                                        className="text-xs font-bold p-1 rounded-2xl text-red-400"
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
                                        className="text-xs p-1 rounded-xl text-blue-400"
                                        onClick={(e) => handleStartEdit(e)}
                                    >수정</p>
                                    {/*삭제 버튼*/}
                                    <p
                                        className="text-xs p-1 rounded-2xl text-red-400"
                                        onClick={(e) => handleDelete(e)}
                                    >삭제</p>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}