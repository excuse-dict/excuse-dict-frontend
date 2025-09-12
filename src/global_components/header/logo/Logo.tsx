import css from "@/global_components/header/Header.module.css";
import Link from "next/link";

export default function Logo(){
    return (
        <div className={css.logo_section}>
            <Link href="/" className={css.logo}>
                <span className={css.logo_icon}>📚</span>
                <span className={css.logo_text}>핑계사전</span>
            </Link>
        </div>
    );
}