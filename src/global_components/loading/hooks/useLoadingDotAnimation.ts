import {useEffect, useRef, useState} from "react";

export const useLoadingDotAnimation = (isTimerActive: boolean, interval: number = 200) => {
    const [dotCount, setDotCount] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isTimerActive) return;

        timerRef.current = setTimeout(() => {
            setDotCount(prev => (prev + 1) % 4);
        }, interval);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isTimerActive, dotCount, interval]);

    return { dotCount };
};