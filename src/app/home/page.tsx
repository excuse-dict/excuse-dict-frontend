import css from './page.module.css'

export default function Home() {

    return (
        <div className={css.main}>
            <section className={css.section}>
                <header className={css.section_header}>
                    <h3>최근 인기 카드</h3>
                    <button className={css.more_button}>+ 더보기</button>
                </header>
            </section>
            <section className={css.section}>
                <header className={css.section_header}>
                    <h3>명예의 전당</h3>
                    <button className={css.more_button}>+ 더보기</button>
                </header>
            </section>
        </div>
    )
}