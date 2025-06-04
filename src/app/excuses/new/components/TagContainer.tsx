import Tag from "@/app/excuses/new/components/Tag";

export default function TagContainer({ tags, emptyLabel }: {
    tags: { name: string, type: string }[],
    emptyLabel?: string
}){
    return (
        <div className={`w-full min-h-4 p-2 rounded-sm flex flex-wrap gap-2 bg-[var(--purple-grey-light)]`}>
            {!tags || tags?.length === 0 ? <span className={'w-full text-gray-400 text-center'}>{emptyLabel || '태그 없음'}</span> : null}
            {tags?.map((tag, index) => (
                <Tag key={index} type={tag.type} name={tag.name}></Tag>
            ))}
        </div>
    );
}