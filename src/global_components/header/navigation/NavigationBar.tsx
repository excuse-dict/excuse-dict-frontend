import css from "@/global_components/header/Header.module.css";
import Link from "next/link";
import {PG_EXCUSES, PG_GENERATOR, PG_HALL_OF_FAME, PG_POPULAR} from "@/app/constants/constants";
import {useState} from "react";

export default function NavigationBar(){

    return (
        <nav className={`${css.nav_menu}`}>
            <Link href={PG_EXCUSES} className={css.nav_link}>
                전체
            </Link>
            <Link href={PG_POPULAR} className={css.nav_link}>
                주간 TOP
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
    );
}