import TagInterface from "@/app/excuses/new/components/TagInterface";

export const tagToKey = (tag: TagInterface): string => {
    return `${tag.category}:${tag.value}`;
};

export const keyToTag = (key: string): TagInterface => {
    const [category, value] = key.split(':');
    return { category, value };
};