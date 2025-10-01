import TagInterface from "@/app/excuses/new/components/TagInterface";
import {PostInterface} from "@/app/excuses/posts/interface/PostInterface";
import {tagToKey} from "@/lib/TagHelper";

export default function PostTag({ post }:{
    post: PostInterface,

}){
    return (
        <div className={'flex gap-2'}>
            {post.excuse.tags.map((tag: TagInterface, index: number) => {
                const isMatched = post.matchedTags.includes(tagToKey(tag));
                return (
                    <span
                        key={index}
                        className={'text-sm'}
                    >
                {isMatched ? (
                    <mark className="bg-yellow-200 px-0.5 rounded-sm text-blue-500" style={{ padding: '0 2px' }}>
                        {`#${tag.value}`}
                    </mark>
                ) : (
                    <span className="text-blue-500">{`#${tag.value}`}</span>
                )}
            </span>
                );
            })}
        </div>
    );
}