'use client'

import { apiPost } from "@/axios/apiPost";
import VerificationModalContent from "@/global_components/modal/content/verification/VerificationModalContent";
import Modal from "@/global_components/modal/Modal";
import { useState } from "react";
import { EP_CHECK_EMAIL_AVAILABILITY, EP_CHECK_EMAIL_REGISTERED, EP_VERIFICATION_CODE_REQ,  PG_PASSWORD_RESET_VERIFIED, VERIFICATION_CODE_PURPOSE } from "../constants/constants";
import EmailInput from "../register/components/email_input/EmailInput";
import sendVerificationCode from "@/axios/requests/post/verificationCode";
import { useEmailVerification } from "@/global_components/modal/content/verification/useEmailVerification";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { apiGet } from "@/axios/apiGet";

export default function PasswordResetPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const emailVerification = useEmailVerification(VERIFICATION_CODE_PURPOSE.RESET_PASSWORD);

    const {
        emailInput, setEmailInput,
    } =  emailVerification;

    // 입력한 이메일로 가입된 회원이 있는지 조회
    const checkEmail = () => {
        apiGet({
            endPoint: EP_CHECK_EMAIL_REGISTERED,
            params: { email: emailInput },
            onSuccess: (response) => {
                if(response.data.data){
                    setModalOpen(true)
                }else{
                    Swal.fire("오류", `${emailInput}으로 가입된 회원 정보가 없습니다`, 'error')
                }
            },
        });
    }

    return (
        <div className="inner_container">
            <h1 className="text-black">이메일을 입력해주세요.</h1>
            <input
                className="global_input w-[40%] text-center mt-[1%]"
                placeholder="이메일을 입력해 주세요."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            ></input>
            <button
                className="global_button w-[10%] h-[30px] text-[16px] rounded-[6px] mt-[3%]"
                onClick={checkEmail}
            >확인</button>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            >
                <VerificationModalContent
                    emailVerification={emailVerification}
                    onSuccess={() => {
                        Swal.fire("인증 성공", "이메일 인증이 완료되었습니다.", "success")
                        .then(() => router.push(PG_PASSWORD_RESET_VERIFIED));
                    }}
                >
                </VerificationModalContent>
            </Modal>
        </div>
    );
}
