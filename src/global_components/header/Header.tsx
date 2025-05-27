'use client'

import { useRouter } from 'next/navigation'
import css from './Header.module.css'

export default function Header(){
    const router = useRouter();

    return (
        <header className={css.header}>
            <button className={css.home_button} onClick={() => router.push('/home')}>
                돌장장이
            </button>
            <nav>
                <button onClick={(() => router.push('/register'))}>회원가입</button>
                <button>로그인</button>
            </nav>
        </header>
    );
}