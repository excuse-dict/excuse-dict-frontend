// axios
export const API_URL: string = 'http://localhost:8080';
export const EP_VERIFICATION_CODE_REQ: string = "/api/v1/auth/verify/codes";
export const EP_CHECK_EMAIL_AVAILABILITY: string = "/api/v1/emails/check-availability"
export const EP_CHECK_EMAIL_REGISTERED: string = "/api/v1/members/emails/is-registered";
export const EP_VERIFY_SIGNUP: string = "/api/v1/auth/verify/signup";
export const EP_VERIFY_RESET_PASSWORD: string = "/api/v1/auth/verify/reset-password";
export const EP_NICKNAME_CHECK: string = "/api/v1/members/nicknames/check-availability";
export const EP_MEMBERS: string = "/api/v1/members";
export const EP_LOGIN: string = "/api/v1/auth/login";
export const EP_RESET_PASSWORD: string = "/api/v1/members/passwords/reset";
export const EP_TAGS: string = "/api/v1/posts/tags"

// 페이지 주소
export const PG_HOME: string = '/home';
export const PG_LOGIN: string = '/login';
export const PG_REGISTER: string = "/register";
export const PG_PASSWORD_RESET: string = "/password-reset";
export const PG_PASSWORD_RESET_VERIFIED: string = '/password-reset-verified';
export const PG_POPULAR: string = "/popular";
export const PG_HALL_OF_FAME: string = "/hall_of_fame";
export const PG_NEW_EXCUSE: string = "/excuses/new";
export const PG_GENERATOR: string = "/generator";
export const PG_ALL_EXCUSES: string = "/excuses";

// 회원가입 제약조건
export const MAX_EMAIL_LENGTH: number = 30;
export const MIN_NICKNAME_LENGTH: number = 2;
export const MAX_NICKNAME_LENGTH: number = 10;
export const MIN_PASSWORD_LENGTH: number = 8;
export const MAX_PASSWORD_LENGTH: number = 128;
export const ALLOWED_SPECIAL_CHARS: string = '!@#$%&*';
export const ALLOWED_SPECIAL_CHARS_REGEX = new RegExp(`[${ALLOWED_SPECIAL_CHARS}]`);

// 인증코드 발급 목적
export const VERIFICATION_CODE_PURPOSE = {
    REGISTRATION : "REGISTRATION",
    RESET_PASSWORD : "RESET_PASSWORD"
}
// 인증코드 발급 쿨타임
export const VERIFICATION_CODE_COOLDOWN: number = 30;

// 태그 카테고리 (백엔드 enum에 대응)
export const TAG_CATEGORIES = [
    { label: '사고', value: 'ACCIDENT' },
    { label: '직장', value: 'COMPANY' },
    { label: '행사', value: 'EVENT' },
    { label: '가족', value: 'FAMILY' },
    { label: '건강', value: 'HEALTH' },
    { label: '집/시설', value: 'HOME_FACILITY' },
    { label: '연애', value: 'LOVE' },
    { label: '종교', value: 'RELIGIOUS' },
    { label: '교통', value: 'TRANSPORT' },
    { label: '날씨', value: 'WEATHER' },
];