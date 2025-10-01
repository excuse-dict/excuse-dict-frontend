import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Swal from "sweetalert2";
import TagInterface from "@/app/excuses/new/components/TagInterface";
import {useRef} from "react";
import {tagToKey} from "@/lib/TagHelper";

export const useTagFilter = () => {
    // ref로 훅들을 저장
    const includeRef = useRef<ReturnType<typeof useTagSelector>>(null as any);
    const excludeRef = useRef<ReturnType<typeof useTagSelector>>(null as any);

    // 콜백 함수 정의 (ref 사용)
    const handleIncludeBeforeAdd = async (tag: TagInterface): Promise<boolean> => {
        if (excludeRef.current?.hasSelectedTag(tag)) {
            const result = await Swal.fire({
                title: '태그 이동',
                text: `'${tag.value}' 태그가 제외 태그에 있습니다. 포함 태그로 이동하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '이동',
                cancelButtonText: '취소',
                heightAuto: false,
            });

            if (result.isConfirmed) {
                excludeRef.current?.removeSelectedTag(tag);
                return true;
            }
            return false;
        }
        return true;
    };

    const handleExcludeBeforeAdd = async (tag: TagInterface): Promise<boolean> => {
        if (includeRef.current?.hasSelectedTag(tag)) {
            const result = await Swal.fire({
                title: '태그 이동',
                text: `'${tag.value}' 태그가 포함 태그에 있습니다. 제외 태그로 이동하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '이동',
                cancelButtonText: '취소',
                heightAuto: false,
            });

            if (result.isConfirmed) {
                includeRef.current?.removeSelectedTag(tag);
                return true;
            }
            return false;
        }
        return true;
    };

    // 훅 생성 (콜백 포함)
    const includeTagSelectorHook = useTagSelector(new Set(), {
        onBeforeAdd: handleIncludeBeforeAdd
    });

    const excludeTagSelectorHook = useTagSelector(new Set(), {
        onBeforeAdd: handleExcludeBeforeAdd
    });

    // ref에 할당
    includeRef.current = includeTagSelectorHook;
    excludeRef.current = excludeTagSelectorHook;

    return {
        includeTagSelectorHook,
        excludeTagSelectorHook,
    };
}