'use client';

import SelectableTag from "@/app/excuses/new/components/selector/modalContent/container/tag/SelectableTag";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Modal from "@/global_components/modal/Modal";
import TagSelectorModalContent from "@/app/excuses/new/components/selector/modalContent/TagSelectorModalContent";
import SelectableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/SelectableTagContainer";
import RemovableTagContainer from "@/app/excuses/new/components/selector/modalContent/container/RemovableTagContainer";

export default function TagSelector({ tagSelector }:{
    tagSelector: ReturnType<typeof useTagSelector>
}) {

    const {
        isSelectorOpen, setSelectorOpen,
    } = tagSelector;

    return (
        <div className='global_input_container w-3/5'>
            <div className='flex justify-between'>
                <span className='global_input_label'>태그</span>
                <button
                    onClick={() => setSelectorOpen(true)}
                >+추가</button>
            </div>
            <RemovableTagContainer
                tagSelector={tagSelector}
            ></RemovableTagContainer>
            {!isSelectorOpen ? null :
                <Modal
                    isOpen={isSelectorOpen}
                    setOpen={setSelectorOpen}
                >
                    <TagSelectorModalContent
                        tagSelector={tagSelector}
                    ></TagSelectorModalContent>
                </Modal>
            }
        </div>
    );
}