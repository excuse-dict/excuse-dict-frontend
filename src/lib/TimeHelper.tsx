export type TimeFormatThreshold = 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS';

const format = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export const getDatetimeFormat = (dateString: string, threshold: TimeFormatThreshold) => {
    try{
        const then = new Date(dateString);

        const now = new Date();
        const diffInMs = now.getTime() - then.getTime();

        // 분 단위 포맷
        const minutes = Math.floor(diffInMs / (1000 * 60));
        if (minutes < 1) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;

        // 시 단위 포맷
        if(threshold === 'MINUTES') return format(then);
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));
        if (hours < 24) return `${hours}시간 전`;

        // 일 단위 포맷
        if(threshold === 'HOURS') return format(then);
        const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (days < 30) return `${days}일 전`;

        // 월 단위 포맷
        if(threshold === 'DAYS') return format(then);
        const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
        if(months < 12) return `${months}개월 전`;

        // 년 단위 포맷
        if(threshold === 'MONTHS') return format(then);
        const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
        return `${years}년 전`;

    } catch (error){
        return "Invalid Datetime";
    }
};

export const isTimePassed = (refTime: string | null, seconds: number) => {

    if(!refTime) return true;

    const then = parseInt(refTime);

    if(isNaN(then)) return true;

    return (Date.now() - then) >= seconds * 1000;
}

export const getTimeDiffForNowInSeconds = (refTime: string | null) => {
    if(!refTime) return -1;

    const then = parseInt(refTime);

    if(isNaN(then)) return -1;

    return Math.ceil((Date.now() - then) / 1000);
}