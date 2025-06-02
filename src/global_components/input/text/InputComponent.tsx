'use client';

import {useState} from "react";

export default function InputComponent({ label, type, placeholder, onChange, labelStyle, inputContainerStyle }: {
    label?: string,
    type?: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    labelStyle?: string,
    inputContainerStyle?: string,
    inputStyle?: string
}){

    const [input, setInput] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if(onChange) onChange(value);
    }

    return (
        <div className={`global_input_container ${inputContainerStyle || ''}`}>
            {!label ? null : <div className={`global_input_label ${labelStyle || ''}`}>{label}</div>}
            <div className='global_input_inner_container'>
                <input
                    className={`global_input`}
                    placeholder={placeholder}
                    value={input}
                    type={type || ''}
                    onChange={handleChange}
                ></input>
            </div>
        </div>
    );
}