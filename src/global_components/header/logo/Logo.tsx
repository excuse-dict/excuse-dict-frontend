import css from "@/global_components/header/Header.module.css";
import Link from "next/link";
import NextImage from 'next/image';

export default function Logo(){
    return (
        <div className={css.logo_section}>
            <Link href="/" className={css.logo}>
                <NextImage
                    src="/icon.png"
                    alt="핑계사전"
                    width={24}
                    height={24}
                    className={css.logo_icon}
                />
                <span className={css.logo_text}>핑계사전</span>
            </Link>
        </div>
    );
}