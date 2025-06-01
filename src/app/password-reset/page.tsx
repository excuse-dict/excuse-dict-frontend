'use client'

import Modal from "@/global_components/modal/Modal";
import {useState} from "react";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {apiGet} from "@/axios/apiGet";
import {useEmailVerification} from "@/app/register/verification/useEmailVerification";
import VerificationModalContent from "@/app/register/verification/VerificationModalContent";
import {useRecaptcha} from "@/app/recaptcha/useRecaptcha";

import ReCAPTCHAComponent from "@/app/recaptcha/ReCAPTCHAComponent";
import PasswordInput from "@/app/register/components/password_input/PasswordInput";
import PasswordConfirm from "@/app/register/components/password_input/PasswordConfirmInput";
import {usePasswordInput} from "@/app/register/components/password_input/usePasswordInput";
import {
    EP_RESET_PASSWORD,
    EP_CHECK_EMAIL_AVAILABILITY,
    EP_CHECK_EMAIL_REGISTERED,
    EP_VERIFICATION_CODE_REQ,
    PG_PASSWORD_RESET_VERIFIED,
    VERIFICATION_CODE_PURPOSE
} from "../constants/constants";
import {apiPatch} from "@/axios/requests/apiPatch";

export default function PasswordResetPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const emailVerification = useEmailVerification(VERIFICATION_CODE_PURPOSE.RESET_PASSWORD);

    const {
        emailInput, setEmailInput,
        isEmailVerified, setEmailVerified,
        recaptchaRef, executeRecaptcha
    } = emailVerification;

    const password = usePasswordInput();

    const { passwordInput, isPasswordValid, isPwMatched } = password;

    // 입력한 이메일로 가입된 회원이 있는지 조회
    const checkEmail = async () => {
        apiGet({
            endPoint: EP_CHECK_EMAIL_REGISTERED,
            params: {email: emailInput},
            onSuccess: (response) => {
                if (response.data.data) {
                    // 모달 열기
                    setModalOpen(true)
                } else {
                    Swal.fire("오류", `${emailInput}으로 가입된 회원 정보가 없습니다`, 'error')
                }
            },
        });
    }

    const resetPassword = async() => {
        // 비밀번호 유효성 검증
        if(!isPasswordValid){
            Swal.fire('오류', "비밀번호 형식이 유효해야 합니다.", "warning");
            return false;
        }

        // 비밀번호 확인란 일치 여부 검증
        if (!isPwMatched) {
            Swal.fire('오류', "비밀번호를 한번 더 확인해주세요.", "warning");
            return false;
        }

        // 비밀번호 변경 요청
        const recaptchaToken = await executeRecaptcha();
        apiPatch({
            endPoint: EP_RESET_PASSWORD,
            body: {
                email: emailInput,
                newPassword: passwordInput,
                recaptchaToken: recaptchaToken
            },
            onSuccess: () => {
                Swal.fire("성공", "비밀번호가 변경되었습니다.", 'success')
                    .then(() => router.push('/login'));
            },
        })
    }

    const handleConfirm = () => {
        if (!isEmailVerified){
            // 이메일 인증 먼저
            checkEmail();
        } else {
            // 인증 후라면 비밀번호 재설정 요청
            resetPassword();
        }
    }

    return (
        <>
            <div className="global_inner_container">
                <h1 className="text-black text-lg font-semibold mb-6">
                    비밀번호를 재설정할 계정의 이메일을 입력해주세요.
                </h1>

                <input
                    className="global_input w-full max-w-md mx-auto text-center mb-4"
                    placeholder="이메일을 입력해 주세요."
                    value={emailInput}
                    disabled={isEmailVerified}
                    onChange={(e) => setEmailInput(e.target.value)}
                />

                {/* 비밀번호 입력창에 트랜지션 적용 */}
                <section
                    className={`transition-all duration-1000 ease-in-out ${
                        isEmailVerified
                            ? 'opacity-100 transform translate-y-0 mb-4'
                            : 'opacity-0 transform translate-y-2 mb-0 h-0'
                    }`}
                    style={{
                        width: '100%',
                        maxWidth: '28rem', // max-w-md와 동일
                        margin: '0 auto'
                    }}
                >
                    {isEmailVerified && (
                        <>
                            <PasswordInput
                                title="새 비밀번호"
                                placeholder="새 비밀번호를 입력해주세요."
                                password={password}
                            />
                            <PasswordConfirm
                                title="비밀번호 확인"
                                placeholder="새 비밀번호를 한번 더 입력해주세요."
                                password={password}
                            />
                        </>
                    )}
                </section>

                <button
                    className="global_button px-8 py-2 text-base rounded-md"
                    onClick={handleConfirm}
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
                        setModalOpen(false); // 모달 먼저 닫기
                        Swal.fire("인증 성공", "이메일 인증이 완료되었습니다.", "success")
                            .then(() => {
                                setEmailVerified(true);
                            });
                    }}
                >
                </VerificationModalContent>
            </Modal>
            <ReCAPTCHAComponent recaptchaRef={recaptchaRef}></ReCAPTCHAComponent>
        </>
    );
}
