import InfiniteChallengeSubtitle from "@/global_components/error-contents/InfiniteChallengeSubtitle";
import SettingGuide from "@/global_components/error-contents/SettingGuide";

export default function NotAllowedContent({ title, subtitle }: {
    title: string,
    subtitle: string,
}){

    return (
        <div className="flex flex-col w-1/2 p-16 bg-white m-auto rounded items-center text-center">
            <h1 className="text-2xl font-bold">{"🚫" + title}</h1>
            <p className="font-light">{subtitle}</p>
            <div className="mt-12"></div>
            <InfiniteChallengeSubtitle text={"실례가 안 된다면 쿠키 하나만 사주십시오"}/>
            <p className="mt-4 mb-4">브라우저 설정에서 쿠키를 허용해주세요</p>
            <SettingGuide env="Microsoft Edge" guide={["설정", "쿠키 관리", "사이트에서 쿠키 데이터를 저장하고 읽도록 허용"]}/>
            <SettingGuide env="Chrome" guide={["설정", "개인 정보 보호 및 보안", "서드 파티 쿠키", "서드 파티 쿠키 허용"]}/>
            <p className="pt-4">이후 페이지를 새로고침해주세요</p>
        </div>
    );
}