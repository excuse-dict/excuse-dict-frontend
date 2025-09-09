import {useState} from "react";
import {MemberInterface} from "@/app/members/MemberInterface";
import {ReplyVoteInterface} from "@/app/excuses/votes/ReplyVoteInterface";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {usePage} from "@/global_components/page/usePage";

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

    const { currentPage, setCurrentPage, setPageInfo } = pageHook;
    const [replies, setReplies] = useState<Array<ReplyInterface>>([]);

    // 대댓글 작성 요청
    const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }

    // 대댓글 조회 요청
    const getReplies = () => {

    }

    const updateReply = ({ replyId, updatedData }: UpdateReplyDto) => {

    }

    return {
        replies, setReplies,
        handleReplySubmit,
        getReplies,
        updateReply,
    }
}