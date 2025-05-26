'use client'

import { useEffect, useState } from 'react';
import { ALLOWED_SPECIAL_CHARS, ALLOWED_SPECIAL_CHARS_REGEX, MAX_EMAIL_LENGTH } from '../constants/constants';
import css from './page.module.css'
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../constants/constants';
import { apiGet } from '../../axios/apiGet';
import Swal from 'sweetalert2';
import { apiPost } from '@/axios/apiPost';
import ModalContent from '@/components/modal/content/ModalContent';
import CodeInput from '@/components/input/code/CodeInput';
import Modal from '@/components/modal/Modal';
import LoadingWidget from '@/components/loading/LoadingWidget';

export default function register() {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPwMatched, setPwMatched] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>("");
    const [isEmailSending, setIsEmailSending] = useState(false);

    return (
        <div className={css.reg_container}>
            <div className={css.reg_header}>
                <h2>회원가입</h2>
            </div>
            <div className={css.reg_main}>
                <EmailInput
                    emailInput={emailInput}
                    setEmailInput={setEmailInput}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    setModalContents={setModalContent}
                    isEmailSending={isEmailSending}
                    setIsEmailSending={setIsEmailSending}
                ></EmailInput>
                <PasswordInput
                    title='비밀번호'
                    placeholder='비밀번호를 입력해주세요.'
                    passwordInput={passwordInput}
                    setPasswordInput={setPasswordInput}
                    passwordConfirmInput={passwordConfirmInput}
                    setPwMatched={setPwMatched}
                ></PasswordInput>
                <PasswordConfirm
                    title='비밀번호 확인'
                    placeholder='비밀번호를 한 번 더 입력해주세요.'
                    passwordInput={passwordInput}
                    passwordConfirmInput={passwordConfirmInput}
                    setPasswordConfirmInput={setPasswordConfirmInput}
                    isPwMatched={isPwMatched}
                    setPwMatched={setPwMatched}
                ></PasswordConfirm>
                <button>회원가입</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                setOpen={setModalOpen}
                children={modalContent}
            ></Modal>
        </div>
    )
}

// 이메일 입력창
function EmailInput({ emailInput, setEmailInput, isModalOpen, setModalOpen, setModalContents, isEmailSending, setIsEmailSending }: {
    emailInput: string,
    setEmailInput: (value: string) => void
    isModalOpen: boolean,
    setModalOpen: (value: boolean) => void
    setModalContents: (value: React.ReactNode) => void
    isEmailSending: boolean,
    setIsEmailSending: (value: boolean) => void
}) {

    const smtpRequest = () => {
        // 이메일 보내는 중...
        setIsEmailSending(true);
        const response: any = apiPost({
            endPoint: "/api/v1/email/verification-code",
            body: { email: emailInput },
            onSuccess: () => setIsEmailSending(false) // 이메일 전송 완료!
        });
    }

    useEffect(() => {
        if(isModalOpen) updateModal();
    }, [isEmailSending])

    const updateModal = () => {

        console.log("isEmailSending in updateModal: ", isEmailSending);

        setModalContents(
            <ModalContent align='center'>
                <h2 className={`${css.modal_text} ${css.modal_title}`}>인증 번호 입력</h2>
                <LoadingWidget
                    color='grey'
                    isLoading={isEmailSending}
                    loadingTitle='메일 전송 중...'
                    completeTitle='메일 전송 완료!'
                ></LoadingWidget>
                <span className={css.modal_text}>입력하신 이메일로 인증 번호 요청을 전송하였습니다. 복사하여 입력해 주세요.</span>
                <CodeInput size={6}></CodeInput>
                <button className={css.modal_confirm_button}>확인</button>
            </ModalContent>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        setEmailInput(input);
    }

    const isEmailValidSimple = () => {
        return emailInput.length > 0 && emailInput.includes('@');
    }

    return (
        <div className={css.reg_input_container}>
            <div className={css.reg_input_label}>이메일</div>
            <div className={css.email_input_container}>
                <input
                    className={css.reg_input}
                    placeholder={`이메일을 입력해 주세요 (최대 ${MAX_EMAIL_LENGTH}자)`}
                    type="email"
                    maxLength={MAX_EMAIL_LENGTH}
                    value={emailInput}
                    onChange={handleChange}
                ></input>
                <button
                    className={css.email_dupl_check}
                    onClick={async () => {
                        if (isEmailValidSimple()) {
                            await apiGet({
                                endPoint: "/api/v1/auth/check-email",
                                params: { email: emailInput },
                                onSuccess: (data) => {
                                    if (data.data) { // 사용 가능 이메일
                                        smtpRequest();
                                        /* updateModal(); // 모달 내용물 바꾸기 */ // 수동 말고 useEffect로 자동
                                        setModalOpen(true);
                                    } else { // 이미 사용중
                                        setModalOpen(false);
                                        Swal.fire("오류", "이미 가입하신 이메일입니다.", "error");
                                    }
                                },
                            })
                        } else {
                            Swal.fire("오류", "이메일을 올바르게 입력해주세요", "warning");
                        }
                    }}
                >인증</button>
            </div>
        </div>
    );
}

// 비밀번호 입력창
function PasswordInput({ title, placeholder, passwordInput, setPasswordInput, passwordConfirmInput, setPwMatched }:
    {
        title: string,
        placeholder: string,
        passwordInput: string,
        setPasswordInput: (value: string) => void
        passwordConfirmInput: string,
        setPwMatched: (value: boolean) => void
    }) {
    const [isInputFocused, setInputFocused] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isLowerCaseIncluded, setIsLowerCaseIncluded] = useState(false);
    const [isUpperCaseIncluded, setIsUpperCaseIncluded] = useState(false);
    const [isDigitIncluded, setIsDigitIncluded] = useState(false);
    const [isSpecialCharacterIncluded, setIsSpecialCharacterIncluded] = useState(false);
    const [isAllCharactersValid, setIsAllCharactersValid] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;

        // 입력 비었는지 여부
        setIsInputEmpty(input.length === 0);
        // 길이 검사
        setIsLengthValid(input.length >= MIN_PASSWORD_LENGTH && input.length <= MAX_PASSWORD_LENGTH);
        // 영문 소문자
        setIsLowerCaseIncluded(/[a-z]/.test(input));
        // 대문자
        setIsUpperCaseIncluded(/[A-Z]/.test(input));
        // 숫자
        setIsDigitIncluded(/\d/.test(input));
        // 특수문자
        setIsSpecialCharacterIncluded(ALLOWED_SPECIAL_CHARS_REGEX.test(input));
        // 허용되지 않는 문자가 포함되었는지
        const allowdCharactersRegex: RegExp = new RegExp(`^[a-zA-Z0-9${ALLOWED_SPECIAL_CHARS_REGEX.source.slice(1, -1)}]*$`);
        setIsAllCharactersValid(allowdCharactersRegex.test(input));

        // 비밀번호 확인란 일치 여부 업데이트
        setPwMatched(passwordConfirmInput === input);
        // 자신 업데이트
        setPasswordInput(input);
    }

    const validColor: string = 'rgb(100, 210, 100)';
    const invalidColor: string = 'rgb(255, 100, 100)';
    // 조건을 입력받아 스타일 객체 반환
    const getValidationStyle = (condition: boolean) => {
        return {
            isVisible: condition,
            style: {
                color: condition ? validColor : invalidColor,
                fontSize: '12px'
            }
        };
    };

    // 개별 유효성 검사 항목
    const ValidationRule = ({ condition, children, isSpecialCharacterSpan = false }: {
        condition: boolean,
        children: React.ReactNode,
        isSpecialCharacterSpan?: boolean
    }) => {

        const { isVisible, style } = getValidationStyle(condition);
        const id: string = isSpecialCharacterSpan ? 'special_character_span' : '';

        return (
            <li className={css.pw_validation_item} id={id}>
                <span style={style}>{children}</span>
                {!isVisible ? <div /> : <span style={{ color: style.color }}>✔</span>}
            </li>
        );
    }

    return (
        <div className={css.reg_input_container}>
            <label className={css.reg_input_label}>{title}</label>
            <div className={css.pw_input_container}>
                <input
                    className={css.reg_input}
                    placeholder={placeholder}
                    value={passwordInput}
                    onChange={handleChange}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    type='password'
                ></input>
            </div>
            <div className={css.pw_validation_container}>
                {(isInputEmpty || !isInputFocused) ? <div /> :
                    <div className={css.pw_validation_tooltip}>
                        <ul>
                            <ValidationRule condition={isLengthValid}>
                                {`${MIN_PASSWORD_LENGTH}~${MAX_PASSWORD_LENGTH}자`}
                            </ValidationRule>
                            <ValidationRule condition={isLowerCaseIncluded}>영문 소문자</ValidationRule>
                            <ValidationRule condition={isUpperCaseIncluded}>영문 대문자</ValidationRule>
                            <ValidationRule condition={isDigitIncluded}>숫자</ValidationRule>
                            <ValidationRule condition={isAllCharactersValid}>허용되지 않은 문자</ValidationRule>
                            <ValidationRule condition={isSpecialCharacterIncluded} isSpecialCharacterSpan={true}>
                                {`특수문자 ⓘ`}
                                <span className={css.tooltip}>
                                    다음 문자들 중 하나를 포함해야 합니다:<br />
                                    {ALLOWED_SPECIAL_CHARS}
                                </span>
                            </ValidationRule>
                        </ul>
                    </div>}
            </div>
        </div>
    );
}

// 비밀번호 확인란
function PasswordConfirm({ title, placeholder, passwordInput, passwordConfirmInput, setPasswordConfirmInput, isPwMatched, setPwMatched }:
    {
        title: string,
        placeholder: string,
        passwordInput: string,
        passwordConfirmInput: string,
        setPasswordConfirmInput: (value: string) => void
        isPwMatched: boolean,
        setPwMatched: (value: boolean) => void
    }
) {
    const [isInputEmpty, setInputEmpty] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input: string = e.target.value;

        setInputEmpty(input.length === 0);
        setPasswordConfirmInput(input);
        setPwMatched(passwordInput === input);
    }

    return (
        <div className={css.reg_input_container}>
            <label className={css.reg_input_label}>{title}</label>
            <div className={css.pw_input_container}>
                <input
                    className={css.reg_input}
                    placeholder={placeholder}
                    value={passwordConfirmInput}
                    onChange={handleChange}
                    type='password'
                ></input>
                {(isInputEmpty || isPwMatched) ? <div /> : <span className={css.pw_error}>비밀번호가 일치하지 않습니다.</span>}
            </div>
        </div>
    );
}