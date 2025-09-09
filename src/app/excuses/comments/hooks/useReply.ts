import {useState} from "react";

export const useReply = () => {
    const [replyInput, setReplyInput] = useState('');

    return {
        replyInput, setReplyInput
    }
}