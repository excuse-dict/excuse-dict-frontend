'use client';

import {useState} from 'react';
import css from './Header.module.css';
import Logo from "@/global_components/header/logo/Logo";
import NavigationBar from "@/global_components/header/navigation/NavigationBar";
import MemberInfo from "@/global_components/header/memberinfo/MemberInfo";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={css.header_container}>
            {/* 로고 */}
            <Logo></Logo>

            {/* 네비게이션 메뉴 */}
            <NavigationBar></NavigationBar>

            {/* 사용자 액션 버튼 */}
            <MemberInfo></MemberInfo>

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
