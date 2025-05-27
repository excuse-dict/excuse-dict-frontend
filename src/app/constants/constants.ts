// axios
export const API_URL: string = 'http://localhost:8080';
export const EP_VERIFICATION_CODE_REQ = "/api/v1/email/verification-code";
export const EP_CHECK_EMAIL_AVAILABILITY = "/api/v1/email/check-availability"
export const EP_VERIFY = "/api/v1/auth/verify";
export const EP_NICKNAME_CHECK = "/api/v1/members/nicknames/check-availability";
export const EP_MEMBERS = "/api/v1/members";
export const EP_LOGIN = "/api/v1/auth/login"

// 회원가입
export const MAX_EMAIL_LENGTH: number = 30;
export const MIN_NICKNAME_LENGTH: number = 2;
export const MAX_NICKNAME_LENGTH: number = 10;
export const MIN_PASSWORD_LENGTH: number = 8;
export const MAX_PASSWORD_LENGTH: number = 128;
export const ALLOWED_SPECIAL_CHARS = '!@#$%&*';
export const ALLOWED_SPECIAL_CHARS_REGEX = new RegExp(`[${ALLOWED_SPECIAL_CHARS}]`);