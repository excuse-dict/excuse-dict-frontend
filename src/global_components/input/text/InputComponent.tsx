'use client';

export default function InputComponent({ value, setValue, label, type, placeholder, onChange, labelStyle, inputContainerStyle }: {
    value: string,
    setValue: (value: string) => void,
    label?: string,
    type?: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    labelStyle?: string,
    inputContainerStyle?: string,
    inputStyle?: string
}){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);

        if(onChange) onChange(value);
    }

    return (
        <div className={`global_input_container w-full ${inputContainerStyle || ''}`}>
            {!label ? null : <div className={`global_input_label ${labelStyle || ''}`}>{label}</div>}
            <div className='global_input_inner_container w-full'>
                <input
                    className={`global_input`}
                    placeholder={placeholder}
                    value={value}
                    type={type || ''}
                    onChange={handleChange}
                ></input>
            </div>
        </div>
    );
}