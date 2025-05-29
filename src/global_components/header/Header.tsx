'use client'

import { useRouter } from 'next/navigation'
import css from './Header.module.css'

export default function Header(){
    const router = useRouter();

    return (
        <header className={css.header}>
            <button 
                className="rounded p-1.5 border-none cursor-pointer text-lg"
                style={{"backgroundColor": 'var(--purple-grey-dark)'}}
                onClick={() => router.push('/home')}>
                108핑계
            </button>
            <nav>
                <button
                    className={css.header_button}
                    onClick={(() => router.push('/login'))}
                >로그인</button>
            </nav>
        </header>
    );
}