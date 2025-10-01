import css from "./Modal.module.css"
import ModalContent from "./content/ModalContent";

export default function Modal({ setOpen, children }: {
    isOpen: boolean,
    setOpen: (value: boolean) => void
    children?: React.ReactElement<typeof ModalContent> // 모달 내용물 ModalContent로 랩핑 강제
}) {

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