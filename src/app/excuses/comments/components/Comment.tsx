import {formatDate} from "@/app/excuses/functions/FormatDate";

export default function Comment({ comment }: {
    comment: any,
}){
    return (
        <div
             className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {comment.author?.nickname?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-semibold text-gray-800 text-sm">
                                                {comment.member?.nickname || '익명'}
                                            </span>
                    <span className="text-xs text-gray-500">
                                                {formatDate(comment.createdAt)}
                                            </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.content}
                </p>
            </div>
        </div>
    );
}