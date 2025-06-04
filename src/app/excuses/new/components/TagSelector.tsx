'use client';

import Tag from "@/app/excuses/new/components/Tag";
import {useTagSelector} from "@/app/excuses/new/components/useTagSelector";
import Modal from "@/global_components/modal/Modal";
import TagSelectorModalContent from "@/app/excuses/new/components/TagSelectorModalContent";
import TagContainer from "@/app/excuses/new/components/TagContainer";

export default function TagSelector() {

    const tags = useTagSelector();

    const {
        isSelectorOpen, setSelectorOpen,
        searchedTags, setSearchedTags,
        selectedTags
    } = tags;

    return (
        <div className='global_input_container w-3/5'>
            <div className='flex justify-between'>
                <span className='global_input_label'>태그</span>
                <button
                    onClick={() => setSelectorOpen(true)}
                >+추가</button>
            </div>
            <TagContainer tags={selectedTags}></TagContainer>
            {!isSelectorOpen ? null :
                <Modal
                    isOpen={isSelectorOpen}
                    setOpen={setSelectorOpen}
                >
                    <TagSelectorModalContent
                        searchedTags={searchedTags}
                        setSearchedTags={setSearchedTags}
                    ></TagSelectorModalContent>
                </Modal>
            }
        </div>
    );
}