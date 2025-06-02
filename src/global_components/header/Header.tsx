'use client';

import Link from 'next/link';
import {useState} from 'react';
import css from './Header.module.css';
import {useAuth} from "@/app/login/auth/useAuth";
import {PG_ALL_EXCUSES, PG_GENERATOR, PG_HALL_OF_FAME, PG_NEW_EXCUSE, PG_POPULAR} from "@/app/constants/constants";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const {isLoggedIn} = useAuth();

    return (
        <div className={css.header_container}>
            {/* 로고 */}
            <div className={css.logo_section}>
                <Link href="/" className={css.logo}>
                    <span className={css.logo_icon}>📚</span>
                    <span className={css.logo_text}>핑계사전</span>
                </Link>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className={`${css.nav_menu} ${isMenuOpen ? css.nav_open : ''}`}>
                <Link href={PG_ALL_EXCUSES} className={css.nav_link}>
                    전체
                </Link>
                <Link href={PG_POPULAR} className={css.nav_link}>
                    인기
                </Link>
                <Link href={PG_HALL_OF_FAME} className={css.nav_link}>
                    명예의 전당
                </Link>
                <Link href={PG_GENERATOR} className={css.nav_link}>
                    핑계 생성기
                    <span className={`${css.ai_span} bg-red-500 rounded-lg ml-2`}>
                        AI
                    </span>
                </Link>
            </nav>

            {/* 사용자 액션 버튼 */}
            <div className={css.user_actions}>
                {isLoggedIn ?
                    <span className={css.user_icon}>👤</span> :
                    <>
                        <Link href="/login" className={`${css.action_btn} ${css.login_btn}`}>
                            로그인
                        </Link>
                        <Link href="/register" className={`${css.action_btn} ${css.register_btn}`}>
                            회원가입
                        </Link>
                    </>
                }
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
                className={`${css.mobile_menu_btn} ${isMenuOpen ? css.active : ''}`}
                onClick={toggleMenu}
                aria-label="메뉴 토글"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    );
}