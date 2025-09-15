import css from './LoadingWidget.module.css'

export default function LoadingWidget({ color, isLoading, isSucceed, loadingTitle, successTitle, failTitle }:{
    color?: string,
    isLoading: boolean,
    isSucceed: boolean | null,
    loadingTitle: string,
    successTitle: string,
    failTitle: string,
}){

    const getLabel = () => {
        if(isLoading) return loadingTitle;
        return isSucceed ? successTitle : failTitle;

    }

    const getIcon = () => {
        if(isLoading) return css.loading_spinner;
        return isSucceed ? css.check_icon : css.failed_icon;
    }

    return (
        <div className={css.loading_container}>
            <div className={getIcon()}></div>
            <h3 className={css.loading_text} style={{color: color}}>{getLabel()}</h3>
        </div>
    );
}