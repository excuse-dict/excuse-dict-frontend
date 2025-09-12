import {useRef, useEffect, useState} from 'react';
import Link from "next/link";
import css from "./MemberInfo.module.css";
import {useAuthState} from "@/app/login/auth/useAuthState";

export default function MemberInfo(){
    const { isLoggedIn, nickname, logout } = useAuthState();

    const [isMemberInfoOpen, setMemberInfoOpen] = useState(false);
    const [memberInfoPos, setMemberInfoPos] = useState({top: 0, left: 0});
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleExpandMemberInfo = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMemberInfoPos({
            top: rect.bottom + 8,
            left: rect.left + (rect.width / 2) - MEMBER_INFO_WIDTH / 2,
        });
        setMemberInfoOpen(!isMemberInfoOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                setMemberInfoOpen(false);
            }
        };

        if (isMemberInfoOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMemberInfoOpen]);

    const MEMBER_INFO_WIDTH = 200;

    return(
        <>
            {isLoggedIn ?
                <div
                    className={`${css.member_info} flex items-center cursor-pointer`}
                    ref={triggerRef}
                    onClick={(e) => handleExpandMemberInfo(e)}
                >
                    <span style={{ color: 'var(--purple-grey-light)' }}>{nickname}</span>
                    <span className={css.user_icon}>👤</span>
                    {isMemberInfoOpen &&
                        <div
                            ref={dropdownRef}
                            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg"
                            style={{
                                position: 'fixed',
                                width: MEMBER_INFO_WIDTH + "px",
                                top: `${memberInfoPos.top}px`,
                                left: `${memberInfoPos.left}px`,
                                zIndex: 100000
                            }}
                        >
                            <button
                                className='global_button'
                                onClick={logout}
                            >로그아웃</button>
                        </div>
                    }
                </div>
                :
                /*비로그인 시에는 [로그인]/[회원가입] 버튼 표시*/
                <div className="flex gap-2">
                    <Link href="/login" className={`${css.action_btn} ${css.login_btn}`}>
                        로그인
                    </Link>
                    <Link href="/register" className={`${css.action_btn} ${css.register_btn}`}>
                        회원가입
                    </Link>
                </div>
            }
        </>
    );
}
