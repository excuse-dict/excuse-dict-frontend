import LoadingWidget from "@/components/loading/LoadingWidget";
import ModalContent from "../ModalContent";
import css from './VerificationModalContent.module.css'
import CodeInput from "@/components/input/code/CodeInput";

export default function VerificationModalContent({ emailInput, isEmailSending, timeLeft }: {
    emailInput: string,
    isEmailSending: boolean
    timeLeft: number
}) {

    const getTimeText = (): string => {
        if(timeLeft === 0) return "(만료됨!)";   
        return timeLeft >= 0 ? `(${timeLeft}초 후 만료)` : '';
    }

    return (
        <ModalContent align='center'>
            <h2 className={`${css.modal_text} ${css.modal_title}`}>인증 번호 입력</h2>
            <LoadingWidget
                color='grey'
                isLoading={isEmailSending}
                loadingTitle='메일 전송 중...'
                completeTitle='메일 전송 완료!'
            ></LoadingWidget>
            <span className={css.modal_text}>
                입력하신 이메일로 인증 번호 요청을 전송하였습니다.<br/>
                복사하여 입력해 주세요. {getTimeText()}
            </span>
            <CodeInput size={6}></CodeInput>
            <div className={css.modal_button_container}>
                <button className={css.modal_confirm_button}>재전송</button>
                <button className={css.modal_confirm_button}>확인</button>
            </div>
        </ModalContent>
    );
}