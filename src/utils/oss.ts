import { GetUpToken } from "../request/req_oss";

export interface OssConfig {
    domain: string;
    bucket: string; 
    region: string; // 地域 such z1
    keyprefix: string; // 图片前缀 such vblog980/
    imgprocess: string; // 图片处理 such ?imageView2/0/format/webp/
    upToken: string; // 上传token
}

const GetOssConfig = async (): Promise<OssConfig> => {
    const res = await GetUpToken();
    const OssC: OssConfig = {
        domain: res.data.domain,
        bucket: res.data.bucket,
        region: res.data.region,
        keyprefix: res.data.keyprefix,
        imgprocess: res.data.imgprocess,
        upToken: res.data.uptoken,
    }
    return OssC;
}

export { GetOssConfig }