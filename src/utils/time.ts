import { parseISO, format } from 'date-fns';

export const formatDateString = (dateString: string | undefined): string => {
    // 解析时间字符串
    if (dateString === undefined) {
        return '';
    }
    const date = parseISO(dateString);
    // 格式化日期
    return format(date, 'yyyy-MM-dd HH:mm');
}

export const formatDate = (dateString: string): Date => {
    // 格式化日期
    return parseISO(dateString)
}
