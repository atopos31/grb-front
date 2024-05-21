import { GetUpToken } from "../request/req_oss";

export interface OssConfig {
    domain: string;
    bucket: string;
    region: string;
    keyprefix: string;
    imgprocess: string;
    upToken: string;
}

const GetOssConfig = async (): Promise<OssConfig> => {
    const res = await GetUpToken();
    const OssC: OssConfig = {
        domain: res.data.data.domain,
        bucket: res.data.data.bucket,
        region: res.data.data.region,
        keyprefix: res.data.data.keyprefix,
        imgprocess: res.data.data.imgprocess,
        upToken: res.data.data.uptoken,
    }
    return OssC;
}

export { GetOssConfig }