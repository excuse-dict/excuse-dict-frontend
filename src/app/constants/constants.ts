// axios
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const EP_VERIFICATION_CODE_REQ = "/api/v1/auth/verify/codes";
export const EP_CHECK_EMAIL_AVAILABILITY = "/api/v1/emails/check-availability"
export const EP_CHECK_EMAIL_REGISTERED = "/api/v1/members/emails/is-registered";
export const EP_VERIFY_SIGNUP = "/api/v1/auth/verify/signup";
export const EP_VERIFY_RESET_PASSWORD = "/api/v1/auth/verify/reset-password";
export const EP_NICKNAME_CHECK = "/api/v1/members/nicknames/check-availability";
export const EP_MEMBERS = "/api/v1/members";
export const EP_LOGIN = "/api/v1/auth/login";
export const EP_RESET_PASSWORD = "/api/v1/members/passwords/reset";
export const EP_TAGS = "/api/v1/posts/tags"
export const EP_REFRESH_ACCESS_TOKEN = "/api/v1/auth/refresh";
export const EP_POST = "/api/v1/posts";
export const EP_VOTE_TO_POST = (postId: string) => `/api/v1/posts/${postId}/votes`;
export const EP_COMMENT = (postId: string) => `/api/v1/posts/${postId}/comments`;
export const EP_VOTE_TO_COMMENT = (commentId: number) => `/api/v1/posts/comments/${commentId}/votes`;

// 페이지 주소
export const PG_HOME = '/home';
export const PG_LOGIN = '/login';
export const PG_REGISTER = "/register";
export const PG_PASSWORD_RESET = "/password-reset";
export const PG_PASSWORD_RESET_VERIFIED = '/password-reset-verified';
export const PG_POPULAR = "/popular";
export const PG_HALL_OF_FAME = "/hall_of_fame";
export const PG_NEW_EXCUSE = "/excuses/new";
export const PG_GENERATOR = "/generator";
export const PG_EXCUSES = "/excuses";

// 회원가입 제약조건
export const MAX_EMAIL_LENGTH = 30;
export const MIN_NICKNAME_LENGTH = 2;
export const MAX_NICKNAME_LENGTH = 10;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const ALLOWED_SPECIAL_CHARS = '!@#$%&*';
export const ALLOWED_SPECIAL_CHARS_REGEX = new RegExp(`[${ALLOWED_SPECIAL_CHARS}]`);

// 인증코드 발급 목적
export const VERIFICATION_CODE_PURPOSE = {
    REGISTRATION : "REGISTRATION",
    RESET_PASSWORD : "RESET_PASSWORD"
}
// 인증코드 발급 쿨타임
export const VERIFICATION_CODE_COOLDOWN = 30;

// 태그 카테고리 (백엔드 enum에 대응)
export const TAG_CATEGORIES = [
    { label: '사고', value: 'ACCIDENT', emoji: '⚠️' },
    { label: '직장', value: 'COMPANY', emoji: '💼' },
    { label: '행사', value: 'EVENT', emoji: '🎉' },
    { label: '운동', value: 'EXERCISE', emoji: '💪' },
    { label: '가족', value: 'FAMILY', emoji: '👨‍👩‍👧‍👦' },
    { label: '재정', value: 'FINANCIAL', emoji: '💰' },
    { label: '건강', value: 'HEALTH', emoji: '🏥' },
    { label: '집/시설', value: 'HOME_FACILITY', emoji: '🏠' },
    { label: '연애', value: 'LOVE', emoji: '💕' },
    { label: '종교', value: 'RELIGIOUS', emoji: '🙏' },
    { label: '학업/공부', value: 'STUDY', emoji: '📖' },
    { label: '교통', value: 'TRANSPORT', emoji: '🚗' },
    { label: '날씨', value: 'WEATHER', emoji: '🌤️' },
];
// 최대 태그 선택 갯수
export const MAX_SELECTED_TAGS = 10;