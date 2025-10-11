import css from "./carousel.module.css";

export default function LoadingCarouselCard(){
    return (
        <div className={css.card}>
            <div className={css.content}>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className={css.stats}>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
            </div>
        </div>
    );
}