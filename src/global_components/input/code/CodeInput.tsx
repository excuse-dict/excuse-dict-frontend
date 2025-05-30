import { useState, useRef, useEffect } from 'react';
import css from './CodeInput.module.css'

export default function CodeInput({ legnth, codes, setCodes }: {
    legnth: number,
    codes: Array<string>,
    setCodes: (value: Array<string>) => void
}) {
    const [isErrorVisible, setErrorVisible] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(legnth).fill(null));

    useEffect(() => {
        if (isErrorVisible) { // 에러는 항상 3초 후 사라짐
            setTimeout(() => {
                setErrorVisible(false);
            }, 3000);
        }
    }, [isErrorVisible]);

    // 한글자씩 입력
    const handleChange = (index: number, value: string) => {
        // 마지막 자 가져오기
        const input: string = value.slice(-1);
        // 한글 입력을 막기 위한 몸부림
        if (/[^a-zA-Z0-9]/.test(input)) {
            setErrorVisible(true);
            return;
        };

        const newCodes = [...codes];
        newCodes[index] = input;
        setCodes(newCodes);

        // 다음 칸으로 포커스 이동
        if (input && index < legnth - 1) {
            inputRefs.current[index + 1]?.focus();
        } else if (input && index === legnth - 1) {
            // 마지막 칸일 땐 포커스 해제
            inputRefs.current[index]?.blur();
        }
    }

    // 붙여넣기
    const handlePaste = (pastedText: string) => {
        const newArr = new Array(legnth).fill('');
        const range = Math.min(pastedText.length, legnth);

        for (let i = 0; i < range; i++) {
            newArr[i] = pastedText.charAt(i);
        }
        setCodes(newArr);
    }

    return (
        <div className={css.code_input_container}>
            <div className={css.code_input_inner_container}>
                {codes.map((code, index) => (
                    <div className={css.code_input_unit} key={index}>
                        <input
                            className={css.code_input_tag}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            maxLength={1}
                            value={code}
                            type='text'
                            onChange={(e) => handleChange(index, e.target.value)}
                            onPaste={(e) => { handlePaste(e.clipboardData.getData('text')) }}

                            // 브라우저 자동 채우기 방지
                            autoComplete="new-password"
                        ></input>
                    </div>
                ))}
            </div>
            <span className={`${css.code_input_error} ${isErrorVisible ? css.visible : ''}`}>영문 및 숫자만 입력할 수 있습니다.</span>
        </div>
    );
}