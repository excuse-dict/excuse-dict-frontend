import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {CommentInterface} from "@/app/excuses/comments/components/Comment";
import {VoteType} from "@/app/excuses/votes/VoteInterface";

export default function CommentCore({ comment, handleVote, toggleRepliesExpanded }: {
    comment: CommentInterface,
    handleVote: (voteType: VoteType, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    toggleRepliesExpanded: () => void,
}){

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
                    </span>
                </div>
                {/*댓글 내용*/}
                <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.content}
                </p>
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
            </div>
        </div>
    );
}