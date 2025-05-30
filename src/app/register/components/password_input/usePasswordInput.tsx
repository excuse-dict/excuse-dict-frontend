import { useState } from "react";

export function usePasswordInput(){
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [passwordConfirmInput, setPasswordConfirmInput] = useState('');
    const [isPwMatched, setPwMatched] = useState(false);

    return {
        passwordInput, setPasswordInput,
        isPasswordValid, setPasswordValid,
        passwordConfirmInput, setPasswordConfirmInput,
        isPwMatched, setPwMatched
    };
}