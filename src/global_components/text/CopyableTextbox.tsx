import css from "./CopyableTextbox.module.css";
import {toast} from "react-toastify";

export default function CopyableTextbox({text, style}: {
    text: string,
    style?: string,
}) {

    const copyToClipboard = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        try{
            // HTTPS에서만 작동하는 최신 방법
            await navigator.clipboard.writeText(text);
        } catch (error){
            // 폴백 -> 구식 방법
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }

        toast("클립보드에 복사됨");
    }

    return (
        <div
            className={`${css.textbox} cursor-pointer ${style}`}
            onClick={(e) => copyToClipboard(e)}
        >
            {text + '🗐'}
        </div>
    );
}