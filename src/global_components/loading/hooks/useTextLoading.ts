// hooks/useTextLoadingAnimation.js
import { useEffect, useRef, useState } from "react";
import {useLoadingDotAnimation} from "@/global_components/loading/hooks/useLoadingDotAnimation";

export const useTextLoading = ({
                                            isLoading,
                                            isSucceed,
                                            loadingText,
                                            successText,
                                            failText,
                                            minTimeLength = 500
                                        }: {
    isLoading: boolean,
    isSucceed: boolean,
    loadingText: string,
    successText: string,
    failText: string,
    minTimeLength: number,
}) => {
    const [minTimePassed, setMinTimePassed] = useState(false);
    const minTimeRef = useRef<NodeJS.Timeout | null>(null);

    const shouldConsiderAsLoading = () => {
        return isLoading || !minTimePassed;
    };

    const { dotCount } = useLoadingDotAnimation(shouldConsiderAsLoading());

    useEffect(() => {
        if (isLoading) {
            setMinTimePassed(false);
            if (minTimeRef.current) {
                clearTimeout(minTimeRef.current);
            }

            minTimeRef.current = setTimeout(() => {
                setMinTimePassed(true);
            }, minTimeLength);
        }
    }, [isLoading, minTimeLength]);

    const getDisplayText = () => {
        if (shouldConsiderAsLoading()) return loadingText + '.'.repeat(dotCount);
        return isSucceed ? successText : failText;
    };

    return {
        getDisplayText,
        shouldConsiderAsLoading
    };
};