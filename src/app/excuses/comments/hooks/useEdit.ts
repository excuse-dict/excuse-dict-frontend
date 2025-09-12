import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";

export const useEdit = (content: string) => {

    const editingTextareaRef = useRef<HTMLTextAreaElement>(null);
    const editingButtonRef = useRef<HTMLDivElement>(null);

    const [isOnEditing, setOnEditing] = useState(false);
    const [editInput, setEditInput] = useState('');

    useEffect(() => {
        setEditInput(content);
    }, [isOnEditing, content]);

    // 수정 모드 중 수정란 이외 외부 클릭 감지
    useEffect(() => {
        if (!isOnEditing) return;

        const handleClickOutside = (event: MouseEvent) => {

            const clickTarget = event.target as Node;

            const swalContainer = document.querySelector('.swal2-container');
            if (swalContainer && swalContainer.contains(clickTarget)) {
                return; // Swal버튼으로 무한굴레 트리거되지 않게
            }

            const isTargetInTextarea = editingTextareaRef.current?.contains(clickTarget);
            const isTargetInButtons = editingButtonRef.current?.contains(clickTarget);

            if (!isTargetInTextarea && !isTargetInButtons) { // ref에 포함되지 않은 요소를 누르면 실행
                event.preventDefault();
                event.stopPropagation();
                handleCancelEdit();
            }
        };

        // 캡처 단계에서 이벤트를 잡아서 다른 핸들러보다 먼저 실행
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOnEditing, editInput]);

    const handleStartEdit = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setOnEditing(true);
        e.stopPropagation();
    }

    // 수정 취소 (수정란 말고 다른 곳을 클릭했을 때 실행)
    const handleCancelEdit = () => {
        if (editInput !== content) {
            Swal.fire({
                title: '수정을 취소하시겠습니까?',
                text: '변경사항이 저장되지 않습니다.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '수정 취소',
                cancelButtonText: '계속 수정',
                heightAuto: false // 높이 자동 조절 비활성화
            }).then((result) => {
                if (!result.isConfirmed) return;

                setOnEditing(false);
                setEditInput("");
            });
        } else { // 바뀐 거 없으면 그냥 수정모드 종료
            setOnEditing(false);
            setEditInput("");
        }
    }

    return {
        isOnEditing, setOnEditing,
        editInput, setEditInput,

        editingTextareaRef,
        editingButtonRef,

        handleStartEdit,
    }
}