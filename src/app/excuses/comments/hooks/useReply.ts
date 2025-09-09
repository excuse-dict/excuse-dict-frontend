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
    myVote: ReplyVoteInterface,
    createdAt: string,
    modifiedAt: string,
}

export interface UpdateReplyDto{
    replyId: string,
    updatedData: Partial<ReplyInterface>
}

export const useReply = ({ comment, pageHook }: {
    comment: CommentInterface,
    pageHook: ReturnType<typeof usePage>,
}) => {

    const { currentPage, nextPageSize } = pageHook;
    const [replies, setReplies] = useState<Array<ReplyInterface>>([]);
    const { replyInput } = useContext(ReplyContext);

    // 대댓글 조회 요청
    const getReplies = (commentId: number) => {
        apiGet({
            endPoint: EP_REPLIES(commentId),
            onSuccess: (data) => setReplies(data.data.data.page.content),
            params: {
                page: currentPage,
                size: REPLY_PAGE_SIZE
            }
        })
    }

    const updateReply = ({ replyId, updatedData }: UpdateReplyDto) => {

    }

    return {
        replies, setReplies,
        getReplies,
        updateReply,
    }
}