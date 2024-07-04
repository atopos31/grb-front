import { format } from 'date-fns';

// 格式化日期为字符串
export const formatDateMilli = (dateMilli: number|undefined): string => {
    const date = new Date();
    date.setTime(dateMilli || 0);
    return format(date, 'yyyy-MM-dd HH:mm');
}

// 格式化日期为date对象
export const formatDate = (dateMilli: number): Date => {
    const date = new Date();
    date.setTime(dateMilli);
    return date;
}
