import {getDatetimeFormat} from "@/lib/GetDatetimeFormat";
import {VoteType} from "@/app/excuses/votes/VoteInterface";
import {ReplyInterface} from "@/app/excuses/comments/hooks/useReply";

export default function ReplyCore({ reply, handleVote }: {
    reply: ReplyInterface,
    handleVote: (value: VoteType) => void,
}){

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
                    </span>
                </div>
                {/*대댓글 내용*/}
                <p className="text-gray-700 text-sm leading-relaxed">
                    {reply.content}
                </p>
                <div className={'flex gap-2 font-light text-sm'}>
                    {/*추천 버튼*/}
                    <button
                        className={`${reply.myVote?.voteType === "UPVOTE" ? 'text-green-500 font-bold' : ''}`}
                        onClick={() => handleVote("UPVOTE")}
                    >{`👍${reply.upvoteCount}`}</button>
                    {/*비추천 버튼*/}
                    <button
                        className={`${reply.myVote?.voteType === "DOWNVOTE" ? 'text-red-500 font-bold' : ''}`}
                        onClick={() => handleVote("DOWNVOTE")}
                    >{`👎${reply.downvoteCount}`}</button>
                    <p>💬</p>
                    <p>{reply.replyCount}</p>
                </div>
            </div>
        </div>
    );
}