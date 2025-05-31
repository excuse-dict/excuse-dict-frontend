'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.header_container}>
            {/* 로고 */}
            <div className={styles.logo_section}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logo_icon}>📚</span>
                    <span className={styles.logo_text}>핑계사전</span>
                </Link>
            </div>

            {/* 네비게이션 메뉴 */}
            <nav className={`${styles.nav_menu} ${isMenuOpen ? styles.nav_open : ''}`}>
                <Link href="/" className={styles.nav_link}>
                    홈
                </Link>
                <Link href="/about" className={styles.nav_link}>
                    소개
                </Link>
            </nav>

            {/* 사용자 액션 버튼 */}
            <div className={styles.user_actions}>
                <Link href="/login" className={`${styles.action_btn} ${styles.login_btn}`}>
                    로그인
                </Link>
                <Link href="/register" className={`${styles.action_btn} ${styles.register_btn}`}>
                    회원가입
                </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
                className={`${styles.mobile_menu_btn} ${isMenuOpen ? styles.active : ''}`}
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