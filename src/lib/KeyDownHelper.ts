export type Keys = 'Enter' | 'Escape'

export const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    key: Keys,
    callback: () => void,
) => {
    if(e.key === key) callback();
}
