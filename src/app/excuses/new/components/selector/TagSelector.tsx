'use client';

import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Modal from "@/global_components/modal/Modal";
import TagSelectorModalContent from "@/app/excuses/new/components/selector/modalContent/TagSelectorModalContent";
import RemovableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/RemovableTagContainer";
import {createPortal} from "react-dom";

export default function TagSelector({label, tagSelectorHook}: {
    label?: string,
    tagSelectorHook: ReturnType<typeof useTagSelector>
}) {

    const {
        isSelectorOpen, setSelectorOpen,
    } = tagSelectorHook;

    return (
        <div className="w-full">
            <div className='flex justify-between'>
                <span className='global_input_label'>{label || '태그'}</span>
                <button
                    onClick={() => setSelectorOpen(true)}
                >+추가
                </button>
            </div>
            <RemovableTagContainer
                tagSelector={tagSelectorHook}
            ></RemovableTagContainer>
            {isSelectorOpen && createPortal(
                <Modal
                    isOpen={isSelectorOpen}
                    setOpen={setSelectorOpen}
                >
                    <TagSelectorModalContent
                        tagSelector={tagSelectorHook}
                    ></TagSelectorModalContent>
                </Modal>
                , document.body
            )}
        </div>
    );
}