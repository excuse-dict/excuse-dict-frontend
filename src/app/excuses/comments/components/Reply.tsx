import {VoteType} from "@/app/excuses/votes/VoteInterface";
import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_REPLIES, EP_VOTE_TO_COMMENT, EP_VOTE_TO_REPLY} from "@/app/constants/constants";
import {useAuthState} from "@/app/login/auth/useAuthState";
import {askToLogin} from "@/app/login/functions/AskToLogin";
import {ReplyInterface, UpdateReplyDto} from "@/app/excuses/comments/hooks/useReply";
import ReplyCore from "@/app/excuses/comments/components/ReplyCore";

export default function Reply({reply, updateReply}: {
    reply: ReplyInterface,
    updateReply: (value: UpdateReplyDto) => void,
}) {

    const {memberId} = useAuthState();

    const handleVote = (voteType: VoteType) => {
        if (!memberId) {
            askToLogin();
            return;
        }

        apiPost({
            endPoint: EP_VOTE_TO_REPLY(reply.id),
            body: {
                voteType: voteType,
            },
            onSuccess: (response) => {
                const isUpvote = response.data.data.data;

                // 대댓글 상태 즉시 업데이트
                updateReply({
                    replyId: reply.id,
                    updatedData: {
                        upvoteCount: voteType === "UPVOTE"
                            ? reply.upvoteCount + (isUpvote ? 1 : -1)
                            : reply.upvoteCount,
                        downvoteCount: voteType === "DOWNVOTE"
                            ? reply.downvoteCount + (isUpvote ? 1 : -1)
                            : reply.downvoteCount,
                        myVote: isUpvote ? {
                            replyId: reply.id,
                            memberId: memberId,
                            voteType: voteType,
                        } : null
                    }
                })
            },
        });
    }

    return (
        <div>
            {/*대댓글 본체*/}
            <ReplyCore
                reply={reply}
                handleVote={handleVote}
            >
            </ReplyCore>
        </div>
    );
}