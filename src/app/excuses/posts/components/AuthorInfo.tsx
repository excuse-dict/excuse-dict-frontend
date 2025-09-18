import {getDatetimeFormat} from "@/lib/TimeHelper";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {useAuthState} from "@/app/login/auth/useAuthState";

export default function AuthorInfo({ post }: {
    post: PostInterface,
}){

    const { memberId } = useAuthState();

    const isMine = (): boolean => {
        return post.author.id === memberId;
    }

    return (
        <div className="flex items-center space-x-3">
            {/*프로필 아이콘*/}
            <div
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {post.author.nickname?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div>
                {/*작성자 닉네임*/}
                <p className={`font-semibold ${isMine() ? 'text-[var(--strong-purple)]' : 'text-gray-800'}`}>
                    {post.author.nickname || '익명'}
                </p>
                {/*작성일시*/}
                <p className="text-sm text-gray-500">
                    {`${getDatetimeFormat(post.createdAt, "DAYS")}${post.createdAt !== post.modifiedAt ? ' (수정됨)' : ''}`}
                </p>
            </div>
        </div>
    );
}