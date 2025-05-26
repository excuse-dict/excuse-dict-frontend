import css from './ModalContent.module.css';

export default function ModalContent({ children, align = 'center' }: {
    children?: React.ReactNode
    align?: 'left' | 'center' | 'right'
}){
    return (
        <div className={`${css.modal_inner_container} ${css[`align_${align}`]}`}>
            {children}
        </div>
    );
}