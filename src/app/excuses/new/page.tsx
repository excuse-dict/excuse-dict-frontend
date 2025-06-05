import InputComponent from "@/global_components/input/text/InputComponent";
import TextBox from "@/global_components/input/text/TextBox";
import TagSelector from "@/app/excuses/new/components/selector/TagSelector";

export default function NewExcusePage(){

    return (
        <div className={`global_container w-3/5`}>
            <InputComponent
                inputContainerStyle={'w-3/5'}
                label="제목"
                placeholder="빠져나가고 싶은 상황을 입력해주세요."
            ></InputComponent>
            <TextBox
                label={'핑계'}
                size={500}
                placeholder={"핑계를 입력해주세요."}
                containerStyle={'w-3/5'}
            ></TextBox>
            <TagSelector></TagSelector>
            <button
                className={'global_button rounded-md p-1 mt-8'}
            >글쓰기</button>
        </div>
    );
}