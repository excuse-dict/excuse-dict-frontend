import {getTimeDiffForNowInSeconds} from "@/lib/TimeHelper";
import {useEffect, useState} from "react";

export const useApiCooldown = ({storageKey, cooldown}: {
    storageKey: string,
    cooldown: number,
}) => {

    const [remainingTime, setRemainingTime] = useState(0);
    const [isInCooldown, setIsInCooldown] = useState(false);

    useEffect(() => {
        // 새로고침 시 상태 복원
        updateCooldown();
    }, []);

    useEffect(() => {
        // 1초마다 실시간 계산 + state 업데이트
        if(isInCooldown){
            const interval = setInterval(updateCooldown, 1000);

            return () => clearInterval(interval);
        }
    }, [isInCooldown])

    const updateCooldown = () => {

        const lastCall = sessionStorage.getItem(storageKey);
        if (!lastCall) {
            setRemainingTime(0);
            setIsInCooldown(false);
            return;
        }

        const timeDiff = getTimeDiffForNowInSeconds(lastCall);
        const remaining = Math.max(0, cooldown - timeDiff);

        // state 업데이트 (재렌더링)
        setRemainingTime(remaining);
        setIsInCooldown(remaining > 0);
    };

    const countStart = () => {
        sessionStorage.setItem(storageKey, Date.now().toString())

        setIsInCooldown(true);
        setRemainingTime(cooldown);
    }

    return {
        remainingTime,
        isInCooldown,
        countStart,
    }
}