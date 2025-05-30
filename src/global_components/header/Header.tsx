'use client'

import { useRouter } from 'next/navigation'
import css from './Header.module.css'
import { PG_HOME, PG_LOGIN } from '@/app/constants/constants';

export default function Header(){
    const router = useRouter();

    return (
        <header className={css.header}>
            <button 
                className="rounded p-1.5 border-none cursor-pointer text-lg"
                style={{"backgroundColor": 'var(--purple-grey-dark)'}}
                onClick={() => router.push(PG_HOME)}>
                핑계보따리
            </button>
            <nav>
                <button
                    className={css.header_button}
                    onClick={(() => router.push(PG_LOGIN))}
                >로그인</button>
            </nav>
        </header>
    );
}