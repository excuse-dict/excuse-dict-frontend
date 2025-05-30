'use client'

import { apiPost } from "@/axios/apiPost";
import VerificationModalContent from "@/global_components/modal/content/verification/VerificationModalContent";
import Modal from "@/global_components/modal/Modal";
import { useState } from "react";
import { EP_VERIFICATION_CODE_REQ } from "../constants/constants";
import EmailInput from "../register/components/EmailInput";
import sendVerificationCode from "@/axios/requests/post/verificationCode";
import { useEmailVerification } from "@/global_components/modal/content/verification/useEmailVerification";

export default function PasswordResetPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const emailVerification = useEmailVerification();

    const {
        emailInput, setEmailInput,
    } =  emailVerification;

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
                onClick={() => setModalOpen(true)}
            >확인</button>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
            >
                <VerificationModalContent
                    emailVerification={emailVerification}
                    setModalOpen={setModalOpen}
                >
                </VerificationModalContent>
            </Modal>
        </div>
    );
}
