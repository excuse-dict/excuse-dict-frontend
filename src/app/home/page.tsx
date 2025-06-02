'use client';

import css from './page.module.css'
import {useRouter} from "next/navigation";
import {PG_NEW_EXCUSE} from "@/app/constants/constants";

export default function Home() {

    const contentWidth = 'w-4/5';

    const router = useRouter();

    return (
        <div className={`global_container ${contentWidth}`}>
            <header className={`flex ${contentWidth} mb-4`}>
                <button
                    className='global_button ml-auto w-16 h-8 text-sm rounded-md'
                    onClick={() => router.push(PG_NEW_EXCUSE)}
                >+글쓰기</button>
            </header>
            <section className={`${css.section} ${contentWidth}`}>
                <header className={css.section_header}>
                    <h3>주간 TOP</h3>
                    <button className={css.more_button}>+ 더보기</button>
                </header>
            </section>
            <section className={`${css.section} ${contentWidth}`}>
                <header className={css.section_header}>
                    <h3>명예의 전당</h3>
                    <button className={css.more_button}>+ 더보기</button>
                </header>
            </section>
        </div>
    );
}