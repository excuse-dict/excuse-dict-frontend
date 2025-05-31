'use client'

import Modal from "@/global_components/modal/Modal";
import { useState } from "react";
import { EP_CHECK_EMAIL_AVAILABILITY, EP_CHECK_EMAIL_REGISTERED, EP_VERIFICATION_CODE_REQ,  PG_PASSWORD_RESET_VERIFIED, VERIFICATION_CODE_PURPOSE } from "../constants/constants";
export default function PasswordResetPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const emailVerification = useEmailVerification(VERIFICATION_CODE_PURPOSE.RESET_PASSWORD);

    const {
        emailInput, setEmailInput,
    } =  emailVerification;

    const { recaptchaRef, executeRecaptcha } = useRecaptcha();

    // 입력한 이메일로 가입된 회원이 있는지 조회
    const checkEmail = async () => {

        // 리캡챠 검증
        const recaptchaToken = await executeRecaptcha();
        if(!recaptchaToken) return;

        apiGet({
            endPoint: EP_CHECK_EMAIL_REGISTERED,
            params: { email: emailInput },
            onSuccess: (response) => {
                if(response.data.data){
                    // 토큰 저장하고 모달 열기
                    emailVerification.setRecaptchaToken(recaptchaToken);
                    setModalOpen(true)
                }else{
                    Swal.fire("오류", `${emailInput}으로 가입된 회원 정보가 없습니다`, 'error')
                }
            },
        });
    }

    return (
        <>
            <div className="inner_container">
                <h1 className="text-black text-lg font-semibold mb-6">
                    비밀번호를 재설정할 계정의 이메일을 입력해주세요.
                </h1>

                <input
                    className="global_input w-full max-w-md mx-auto text-center mb-4"
                    placeholder="이메일을 입력해 주세요."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />

                <button
                    className="global_button px-8 py-2 text-base rounded-md"
                    onClick={checkEmail}
                >
                    확인
                </button>
            </div>
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
            <ReCAPTCHAComponent recaptchaRef={recaptchaRef}></ReCAPTCHAComponent>
        </>
);
}
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { apiGet } from "@/axios/apiGet";
import {useEmailVerification} from "@/app/register/verification/useEmailVerification";
import VerificationModalContent from "@/app/register/verification/VerificationModalContent";
import {useRecaptcha} from "@/app/recaptcha/useRecaptcha";

import ReCAPTCHAComponent from "@/app/recaptcha/ReCAPTCHAComponent";
