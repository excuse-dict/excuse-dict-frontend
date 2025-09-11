import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {VoteType} from "@/app/excuses/votes/VoteInterface";
import {useComment} from "@/app/excuses/comments/hooks/useComment";
import React, {useEffect, useRef, useState} from "react";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import {useAuthState} from "@/app/login/auth/useAuthState";
import Swal from "sweetalert2";
import {apiPatch} from "@/axios/requests/patch/apiPatch";
import {EP_UPDATE_OR_DELETE_COMMENT} from "@/app/constants/constants";

export default function CommentCore({ comment, commentHook, toggleRepliesExpanded }: {
    comment: CommentInterface,
    commentHook: ReturnType<typeof useComment>
    toggleRepliesExpanded: () => void,
}){

    const { memberId } = useAuthState();
    const { updateComment, deleteComment, voteToComment } = commentHook;

    const [isOnEditing, setOnEditing] = useState(false);
    const [editInput, setEditInput] = useState('');

    useEffect(() => {
        setEditInput(comment.content);
    }, [isOnEditing, comment.content]);
    
    const handleEdit = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setOnEditing(true);
        e.stopPropagation();
    }
    
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

    const editingTextareaRef = useRef<HTMLTextAreaElement>(null);
    const editingButtonRef = useRef<HTMLDivElement>(null);

    // 수정 모드 중 수정란 이외 외부 클릭 감지
    useEffect(() => {
        if (!isOnEditing) return;

        const handleClickOutside = (event: MouseEvent) => {

            const clickTarget = event.target as Node;

            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer && swalContainer.contains(clickTarget)) {
                return; // Swal버튼으로 무한굴레 트리거되지 않게
            }

            const isTargetInTextarea = editingTextareaRef.current?.contains(clickTarget);
            const isTargetInButtons = editingButtonRef.current?.contains(clickTarget);

            if (!isTargetInTextarea && !isTargetInButtons) { // ref에 포함되지 않은 요소를 누르면 실행
                event.preventDefault();
                event.stopPropagation();
                handleCancelEdit();
            }
        };

        // 캡처 단계에서 이벤트를 잡아서 다른 핸들러보다 먼저 실행
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOnEditing, editInput]);

    // 수정 취소 (수정란 말고 다른 곳을 클릭했을 때 실행)
    const handleCancelEdit = () => {
        if (editInput !== comment.content) {
            Swal.fire({
                title: '수정을 취소하시겠습니까?',
                text: '변경사항이 저장되지 않습니다.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '수정 취소',
                cancelButtonText: '계속 수정',
                heightAuto: false // 높이 자동 조절 비활성화
            }).then((result) => {
                if (!result.isConfirmed) return;

                setOnEditing(false);
                setEditInput("");
            });
        } else { // 바뀐 거 없으면 그냥 수정모드 종료
            setOnEditing(false);
            setEditInput("");
        }
    }

    // 수정 요청 전송
    const handleSubmitEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation();

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
                                    onClick={(e) => handleEdit(e)}
                                >수정</p>
                                {/*삭제 버튼*/}
                                <p
                                    className="text-xs p-1 rounded-2xl text-red-400"
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