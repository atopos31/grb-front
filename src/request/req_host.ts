import { EventSourcePolyfill } from 'event-source-polyfill';
import { getToken } from '../utils/token';

export interface Host {
    cpuPrecent: number | undefined;
    mem: Mem | undefined;
    net: Net | undefined;
}

interface Mem {
    total: number;
    used: number;
    usedPercent: number;
}

interface Net {
    bytesRecv: number;
    bytesSent: number;
}

const targetURL = import.meta.env.VITE_TARGET_URL
const baseURL = import.meta.env.VITE_API_URL
const token = getToken()
const url = `${targetURL}${baseURL}/host/get`

export const HstSSE = ()=> {
    return new EventSourcePolyfill(
        url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
} 

