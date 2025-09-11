import {useContext, useState} from "react";
import {MemberInterface} from "@/app/members/MemberInterface";
import {ReplyVoteInterface} from "@/app/excuses/votes/ReplyVoteInterface";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {usePage} from "@/global_components/page/usePage";
import {apiGet} from "@/axios/requests/get/apiGet";
import {EP_REPLIES, REPLY_PAGE_SIZE} from "@/app/constants/constants";
import {apiPost} from "@/axios/requests/post/apiPost";
import {ReplyContext} from "@/app/excuses/contexts/ReplyContext";

export interface ReplyInterface {
    id: number,
    content: string,
    author: MemberInterface,
    upvoteCount: number,
    downvoteCount: number,
    replyCount: number,
    myVote: ReplyVoteInterface | null,
    createdAt: string,
    modifiedAt: string,
}

export interface UpdateReplyDto{
    replyId: number,
    updatedData: Partial<ReplyInterface>
}

export const useReply = ({ comment, pageHook }: {
    comment: CommentInterface,
    pageHook: ReturnType<typeof usePage>,
}) => {

    const { currentPage, setPageInfo } = pageHook;
    const [replies, setReplies] = useState<Array<ReplyInterface>>([]);

    // 대댓글 조회 요청
    const getReplies = (commentId: number) => {
        apiGet({
            endPoint: EP_REPLIES(commentId),
            onSuccess: (response) => {
                const newReplies = response.data.data.page.content;

                if (currentPage === 0) {
                    // 0페이지면 새로 설정
                    setReplies(newReplies);
                } else {
                    // 0페이지가 아니면 기존 답글에 추가 (누적)
                    setReplies(prev => [...prev, ...newReplies]);
                }
                setPageInfo(response.data.data.pageInfo);
            },
            params: {
                page: currentPage,
                size: REPLY_PAGE_SIZE
            }
        })
    }

    // 대댓글 상태 업데이트
    const updateReply = ({ replyId, updatedData }: UpdateReplyDto) => {
        setReplies(replies =>
            replies.map(reply =>    // Reply 배열을 순회
                reply.id === replyId
                    ? { ...reply, ...updatedData }  // id 일치하면 업데이트
                    : reply                         // 나머지는 냅두기
            )
        );
    }

    return {
        replies, setReplies,
        getReplies,
        updateReply,
    }
}