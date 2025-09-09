import {createContext, ReactNode, useState} from "react";

export const ReplyContext = createContext<ReplyContextType>({
    replyInput: '',
    setReplyInput: () => {}
});

interface ReplyContextType {
    replyInput: string;
    setReplyInput: (value: string) => void;
}

export const ReplyProvider = ({ children }: {
    children: ReactNode
}) => {
    const [replyInput, setReplyInput] = useState('');

    return (
        <ReplyContext.Provider value={{ replyInput, setReplyInput }}>
            {children}
        </ReplyContext.Provider>
    );
}