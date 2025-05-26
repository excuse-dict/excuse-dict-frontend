import { useEffect } from 'react';
import css from './LoadingWidget.module.css'

export default function LoadingWidget({ color, isLoading, loadingTitle, completeTitle }:{
    color?: string,
    isLoading: boolean,
    loadingTitle: string,
    completeTitle: string
}){

    const label = isLoading ? loadingTitle : completeTitle;
    const iconClass = isLoading ? css.loading_spinner : css.check_icon;

    console.log("isLoading: ", isLoading);
    console.log("label: ", label);

    return (
        <div className={css.loading_container}>
            <div className={iconClass}></div>
            <h3 className={css.loading_text} style={{color: color}}>{label}</h3>
        </div>
    );
}