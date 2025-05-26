import { useState } from "react";
import css from "./Modal.module.css"

export default function Modal({ isOpen, setOpen, children }: {
    isOpen: boolean,
    setOpen: (value: boolean) => void
    children?: any
}) {

    if(!isOpen) return null;

    return (
        <div className={css.modal_background}>
            <div className={css.modal_container}>
                <button 
                    className={css.modal_close}
                    onClick={() => setOpen(false)}
                >×</button>
                {children}
            </div>
        </div>
    );
}