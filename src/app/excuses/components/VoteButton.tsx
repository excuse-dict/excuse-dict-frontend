import {apiPost} from "@/axios/requests/post/apiPost";
import {EP_VOTE_TO_POST} from "@/app/constants/constants";
import {usePost} from "@/app/excuses/hooks/usePost";

type VoteType = "UPVOTE" | "DOWNVOTE";

export default function VoteButton({ postState, voteType }: {
    postState: ReturnType<typeof usePost>,
    voteType: VoteType,
}) {
    const { post, upvote, cancelUpvote, downvote, cancelDownvote } = postState;
    const myVoteType: string = post?.myVote?.voteType;

    const handleVote = () => {
        apiPost({
            endPoint: EP_VOTE_TO_POST(post.postId),
            body: {
                voteType: voteType,
            },
            onSuccess: (response) => {
                if (voteType === "UPVOTE") {
                    if (response.data.data.data) {
                        upvote();
                    } else {
                        cancelUpvote();
                    }
                } else {
                    if (response.data.data.data) {
                        downvote();
                    } else {
                        cancelDownvote();
                    }
                }
            }
        });
    };

    // voteType에 따른 설정
    const config = {
        UPVOTE: {
            emoji: '👍',
            baseColor: 'green',
            count: post.upvoteCount || 0,
            textColor: 'text-green-600',
            hoverColor: 'hover:text-green-700 hover:bg-green-50',
            activeColor: 'text-green-700 bg-green-100'
        },
        DOWNVOTE: {
            emoji: '👎',
            baseColor: 'red',
            count: post.downvoteCount || 0,
            textColor: 'text-red-600',
            hoverColor: 'hover:text-red-700 hover:bg-red-50',
            activeColor: 'text-red-700 bg-red-100'
        }
    };

    const currentConfig = config[voteType];
    const isActive = myVoteType === voteType;

    return (
        <button
            className={`flex items-center space-x-2 transition-all duration-200 group px-3 py-1.5 rounded-lg ${
                isActive
                    ? `${currentConfig.activeColor} font-bold`
                    : `${currentConfig.textColor} ${currentConfig.hoverColor}`
            }`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleVote();
            }}
        >
            <span className={`text-lg group-hover:scale-110 transition-transform ${
                isActive ? 'scale-110' : ''
            }`}>
                {currentConfig.emoji}
            </span>
            <span className="font-semibold">{currentConfig.count}</span>
        </button>
    );
}