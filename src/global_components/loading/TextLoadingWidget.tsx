import { useEffect, useRef, useState } from "react";
import css from './TextLoadingWidget.module.css'

export default function TextLoadingWidget({ isLoading, isSucceed, loadingText, successText, failText, minTimeLength = 1000, shouldHidden }: {
    isLoading: boolean,
    isSucceed: boolean,
    loadingText: string,
    successText: string,
    failText: string,
    minTimeLength?: number, // 로딩 중 상태로 표시할 최소 시간(ms단위, 기본값 1000)
    shouldHidden: boolean
}) {

    const [dotCount, setDotCount] = useState(0);
    const [minTimePassed, setMinTimePassed] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const minTimeRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isLoading) { // 로딩이 false -> true로 바뀔 때만 실행
            // 리셋
            resetStates();
            // 로딩 중 상태가 되면 타이머 시작

            minTimeRef.current = setTimeout(() => {
                setMinTimePassed(true);
            }, minTimeLength);
        }
    }, [isLoading]);

    const getDisplayText = () => {
        if (shouldConsiderAsLoading()) return loadingText + '.'.repeat(dotCount);
        return isSucceed ? successText : failText;
    }

    const resetStates = () => {
        setMinTimePassed(false);

        if (minTimeRef.current) {
            clearTimeout(minTimeRef.current);
        }
    }

    // 로딩 중 판단 조건
    const shouldConsiderAsLoading = () => {
        return isLoading || !minTimePassed;
    }

    // 점 애니메이션
    useEffect(() => {
        if (!shouldConsiderAsLoading()) return;

        timerRef.current = setTimeout(() => {
            setDotCount(prev => (prev + 1) % 4); // 0,1,2,3 순환
        }, 300);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isLoading, minTimePassed, dotCount]);

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