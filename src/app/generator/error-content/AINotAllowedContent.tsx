import InfiniteChallengeSubtitle from "@/app/generator/error-content/InfiniteChallengeSubtitle";
import SettingGuide from "@/app/generator/error-content/SettingGuide";
import {useRouter} from "next/navigation";
import {PG_LOGIN} from "@/app/constants/constants";

export default function AINotAllowedContent(){

    const router = useRouter();

    return (
        <div className="flex flex-col w-1/2 p-16 bg-white m-auto rounded items-center text-center">
            <h1 className="text-2xl font-bold">🚫AI 파업 중!</h1>
            <p className="font-light">쿠키가 없으면 머리가 안 돌아간대요</p>
            <div className="mt-16"></div>
            <div className="border-gray-800 border-t w-full"></div>
            <p className="font-semibold mr-auto ml-4 mt-2 mb-8 text-xl text-blue-800">Solution #1</p>
            <InfiniteChallengeSubtitle text={"실례가 안 된다면 쿠키 하나만 사주십시오"}/>
            <p className="mt-4 mb-4">브라우저 설정에서 쿠키를 허용해주세요</p>
            <SettingGuide env="Microsoft Edge" guide={["설정", "쿠키 관리", "사이트에서 쿠키 데이터를 저장하고 읽도록 허용"]}/>
            <SettingGuide env="Chrome" guide={["설정", "개인 정보 보호 및 보안", "서드 파티 쿠키", "서드 파티 쿠키 허용"]}/>
            <div className="mt-16"></div>
            <div className="border-gray-800 border-t w-full"></div>
            <p className="font-semibold mr-auto ml-4 mt-2 mb-8 text-xl text-blue-800">Solution #2</p>
            <InfiniteChallengeSubtitle text={"신원조차 파악할 수 없는 상황"}/>
            <p className="mt-4 mb-4 w-fit text-blue-400 hover:underline hover:cursor-pointer"
               onClick={() => router.push(PG_LOGIN)}
            >또는 로그인 해주세요↗</p>
            <p>로그인 사용자는 쿠키 저장 없이 자유롭게 서비스를 이용하실 수 있습니다.</p>
        </div>
    );
}