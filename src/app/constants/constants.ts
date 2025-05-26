// axios
export const API_URL: string = 'http://localhost:8080';

// 회원가입
export const MAX_EMAIL_LENGTH: number = 30;
export const MIN_PASSWORD_LENGTH: number = 8;
export const MAX_PASSWORD_LENGTH: number = 128;
export const ALLOWED_SPECIAL_CHARS = '!@#$%&*';
export const ALLOWED_SPECIAL_CHARS_REGEX = new RegExp(`[${ALLOWED_SPECIAL_CHARS}]`);