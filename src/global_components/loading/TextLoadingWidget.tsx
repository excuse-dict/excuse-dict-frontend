import { useEffect, useRef, useState } from "react";
import css from './TextLoadingWidget.module.css'
import {useTextLoading} from "@/global_components/loading/hooks/useTextLoading";

export default function TextLoadingWidget({ isLoading, isSucceed, loadingText, successText, failText, minTimeLength = 500, shouldHidden }: {
    isLoading: boolean,
    isSucceed: boolean,
    loadingText: string,
    successText: string,
    failText: string,
    minTimeLength?: number, // 로딩 중 상태로 표시할 최소 시간(ms단위, 기본값 1000)
    shouldHidden: boolean
}) {

    const { getDisplayText, shouldConsiderAsLoading } = useTextLoading({
        isLoading: isLoading,
        isSucceed: isSucceed,
        loadingText: loadingText,
        successText: successText,
        failText: failText,
        minTimeLength: minTimeLength
    });


    const getState = () => {
        if (shouldConsiderAsLoading()) return "loading";
        return isSucceed ? "succeed" : "failed";
    }

    return (
        <span
            className={`${css.nickname_condition} ${css[getState()]}`}
            style={{visibility: shouldHidden ? 'hidden' : 'visible'}}
        >{getDisplayText()}</span>
    );
}