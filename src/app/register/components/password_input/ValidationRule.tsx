import css from './PasswordInput.module.css'

// 개별 유효성 검사 항목
export default function ValidationRule ({condition, children, isSpecialCharacterSpan = false}: {
    condition: boolean,
    children: React.ReactNode,
    isSpecialCharacterSpan?: boolean
}){
    const id = isSpecialCharacterSpan ? 'special_character_span' : '';

    const validColor: string = 'rgb(100, 210, 100)';
    const invalidColor: string = 'rgb(255, 100, 100)';

    // 조건을 입력받아 스타일 객체 반환
    const getValidationStyle = (condition: boolean) => {
        return {
            isVisible: condition,
            style: {
                color: condition ? validColor : invalidColor,
                fontSize: '12px'
            }
        };
    };

    const {style} = getValidationStyle(condition);

    return (
        <li className={css.pw_validation_item} id={id} style={{color: 'black'}}>
            <span style={style}>{children}</span>
            {condition ? <span style={{color: style.color}}>✔</span> : <span></span>}
        </li>
    );
}