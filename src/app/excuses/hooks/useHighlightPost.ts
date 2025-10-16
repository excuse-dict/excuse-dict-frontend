import {useEffect, useRef, useState} from "react";

interface UseHighlightPostProps {
    scrollBehavior?: ScrollBehavior;
    scrollBlock?: ScrollLogicalPosition;
}

interface UseHighlightPostReturn {
    highlightedId: number | null;
    setHighlightedId: (id: number | null) => void;
    postRefs: React.MutableRefObject<{[key: number]: HTMLDivElement | null}>;
    highlightClassName: string;
}

export function useHighlightPost({
                                     scrollBehavior = 'smooth',
                                     scrollBlock = 'center'
                                 }: UseHighlightPostProps = {}): UseHighlightPostReturn {

    const [highlightedId, setHighlightedId] = useState<number | null>(null);

    // 게시물 DOM 요소 참조를 위한 ref
    const postRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

    // 하이라이트 CSS 클래스명
    const highlightClassName = 'highlight-post';

    // 하이라이트 효과 적용
    useEffect(() => {
        if (highlightedId && postRefs.current[highlightedId]) {
            const element = postRefs.current[highlightedId];

            // 스크롤 이동
            element?.scrollIntoView({
                behavior: scrollBehavior,
                block: scrollBlock
            });

            // 하이라이트 클래스 추가
            element?.classList.add(highlightClassName);

            // 애니메이션 종료 시 하이라이트 클래스 제거
            const handleAnimationEnd = () => {
                element?.classList.remove(highlightClassName);
            };

            element?.addEventListener('animationend', handleAnimationEnd);

            // 클린업 로직
            return () => {
                element?.removeEventListener('animationend', handleAnimationEnd);
                element?.classList.remove(highlightClassName);
            };
        }
    }, [highlightedId, scrollBehavior, scrollBlock, highlightClassName]);

    return {
        highlightedId,
        setHighlightedId,
        postRefs,
        highlightClassName
    };
}