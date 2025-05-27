import css from './LoginInput.module.css'

export default function LoginInput({ placeholder, type }: {
    placeholder: string,
    type?: string
}){

    return (
        <input
            className={css.login_input}
            placeholder={placeholder}
            type={type}
            /* onChange={handleChange} */
        ></input>
    );
}