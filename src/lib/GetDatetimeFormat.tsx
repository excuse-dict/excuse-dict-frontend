export const getDatetimeFormat = (dateString: string) => {
    try{
        const then = new Date(dateString);

        const now = new Date();
        const diffInMs = now.getTime() - then.getTime();

        const minutes = Math.floor(diffInMs / (1000 * 60));
        const hours = Math.floor(diffInMs / (1000 * 60 * 60));

        if (minutes < 1) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;

        return then.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    } catch (error){
        return "Invalid Datetime";
    }
};