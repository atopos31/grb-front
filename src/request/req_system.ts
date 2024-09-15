import { EventSourcePolyfill } from 'event-source-polyfill';
import { getToken } from '../utils/token';
import http from './request';

export interface Info {
    os: string | undefined;
    platform: string | undefined;
    platform_version: string | undefined;
    kernel_version: string | undefined;
    arch: string | undefined;
}


export interface Cmn {
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

export const getSystemInfo = () => {
    return http.get("/system/info")
}

const targetURL = import.meta.env.VITE_TARGET_URL
const baseURL = import.meta.env.VITE_API_URL

const url = `${targetURL}${baseURL}/system/cmn`

export const HstSSE = () => {
    const token = getToken()
    return new EventSourcePolyfill(
        url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}

