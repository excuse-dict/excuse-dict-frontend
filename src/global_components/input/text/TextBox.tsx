'use client';

import css from './TextBox.module.css';
import {useEffect, useRef} from "react";

export default function TextBox({
                                    value,
                                    setValue,
                                    label,
                                    min,
                                    max,
                                    placeholder,
                                    onChange,
                                    containerStyle
                                }: {
    value: string,
    setValue: (value: string) => void,
    label?: string,
    min?: number,
    max?: number,
    placeholder?: string,
    onChange?: (value: string) => void,
    containerStyle?: string,
}) {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        // 길이 제한
        if (max && value.length > max) return;

        setValue(value);

        if (onChange) onChange(value);
    }

    // 동적 높이 조정
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const isLengthValid = () => {
        if(min && value.length < min) return false;
        if(max && value.length > max) return false;
        return true;
    }

    return (
        <div className={`${css.text_area_container} ${containerStyle || ''}`}>
            <span className={'global_input_label'}>{label}</span>
            <div className={css.text_area_inner_container}>
                <textarea
                    ref={textareaRef}
                    className={`${css.text_area}`}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                ></textarea>
                {!max ? null :
                    <span
                        className={`${css.size_span} ${isLengthValid() ? '' : css.error}`}
                    >{`${value.length}/${max}자`}</span>}
            </div>
        </div>
    );
}