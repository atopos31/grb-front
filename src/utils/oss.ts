import { GetUpToken } from "../request/req_oss";

export interface OssConfig {
    bucket: string;
    region: string;
    keyprefix: string;
    upToken: string;
}

const GetOssConfig = async (): Promise<OssConfig> => {
    const res = await GetUpToken();
    const OssC: OssConfig = {
        bucket: res.data.data.bucket,
        region: res.data.data.region,
        keyprefix: res.data.data.keyprefix,
        upToken: res.data.data.uptoken,
    }
    return OssC;
}

export { GetOssConfig }