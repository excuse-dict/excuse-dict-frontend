import {MAX_EMAIL_LENGTH} from "@/app/constants/constants";
import css from './InputWithButton.module.css';
import {ChangeEvent, MouseEventHandler} from "react";

export default function InputWithButton({
                                            labelText, placeholder, type,
                                            disabled, maxLength, value,
                                            onInputChange, onButtonClick,
                                            buttonText
                                        }: {
    labelText: string,
    placeholder: string,
    type?: string,
    disabled?: boolean,
    maxLength?: number,
    value?: number,
    onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    onButtonClick?: () => void,
    buttonText: string,
}) {
    return (
        <div className='global_input_container w-full'>
            <div className='global_input_label'>{labelText}</div>
            <div className='global_input_inner_container'>
                <input
                    className='global_input w-[100%]'
                    placeholder={placeholder}
                    type={type}
                    readOnly={disabled}
                    maxLength={maxLength}
                    value={value}
                    onChange={onInputChange}
                ></input>
                <button
                    className={css.button}
                    disabled={disabled}
                    onClick={onButtonClick}
                >{buttonText}</button>
            </div>
        </div>
    );
}