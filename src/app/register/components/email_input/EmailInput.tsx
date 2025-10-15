import css from './EmailInput.module.css'
import {MAX_EMAIL_LENGTH} from "@/app/constants/constants";
import Swal from "sweetalert2";
import {useEmailVerification} from "../../verification/useEmailVerification";
import {toast} from "react-toastify";

// 이메일 입력창
export default function EmailInput({ emailVerificationHook, setModalOpen }: {
    emailVerificationHook: ReturnType<typeof useEmailVerification>;
    setModalOpen: (value: boolean) => void,
}) {

    const {
        emailInput,
        setEmailInput,
        isEmailSending,
        isEmailVerified,
        timeToResend,
    } = emailVerificationHook;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setEmailInput(input);
    }

    const isEmailValidSimple = () => {
        return emailInput.length > 0 && emailInput.includes('@');
    }

    const handleClick = async() => {

        // 빠르게 재요청 방지
        if(isEmailSending) {
            toast.error("이전 요청을 처리 중입니다. 잠시 후 다시 시도해 주세요.");
            //setEmailSending(false);
            return;
        }

        // 대기시간 중
        if(timeToResend > 0) {
            toast.error(`연달아서 코드를 발급하실 수 없습니다. ${timeToResend}초 후 다시 시도해주세요.`);
            return;
        }

        // 이메일 유효성 간략하게 검증
        if (!isEmailValidSimple()) {
            Swal.fire("오류", "이메일을 올바르게 입력해주세요", "warning");
            return;
        }

        // 모달 열기
        setModalOpen(true);
    }

    return (
        <div className='global_input_container w-full'>
            <div className='global_input_label'>이메일</div>
            <div className='global_input_inner_container'>
                <input
                    className='global_input w-[100%]'
                    placeholder={`이메일을 입력해 주세요 (최대 ${MAX_EMAIL_LENGTH}자)`}
                    type='email'
                    readOnly={isEmailVerified}
                    maxLength={MAX_EMAIL_LENGTH}
                    value={emailInput}
                    onChange={handleChange}
                ></input>
                <button
                    className={css.email_dupl_check}
                    disabled={isEmailVerified}
                    onClick={handleClick}
                >{isEmailVerified ? '인증 완료' : '인증'}</button>
            </div>
        </div>
    );
}