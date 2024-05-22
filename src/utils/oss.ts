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