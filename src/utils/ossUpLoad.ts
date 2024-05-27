import { customRequestArgs } from "@douyinfe/semi-ui/lib/es/upload";
import { GetOssConfig, OssConfig } from "./oss";
import * as qiniu from "qiniu-js";
import { QiniuError, QiniuRequestError, region } from "qiniu-js";
import SparkMD5 from 'spark-md5';
import { UploadImgCallBack } from "md-editor-rt";
import { Toast } from "@douyinfe/semi-ui";

/**
 * markdown 上传图片
 * @param files // 图片列表
 * @param callBack // 回调图片url
 */
const markdownUpImg = async (files: Array<File>, callBack: UploadImgCallBack) => {
    let urls: Array<{
        url: string;
        alt: string;
        title: string;
    }> = []
    const OssConfig = await GetOssConfig()
    files.map(async (file) => {
        // 立即弹出上传中 提高用户体验
        Toast.info({ content: `${file.name}上传中:0%`,duration: 0, id: file.name })
        await ossQiNiuUpLoad(OssConfig,
            file,
            (next: any) => {
                // 上传进度展示
                const loded = Math.floor(next.total.percent)
                Toast.info({ content: `${file.name}上传中:${loded}%`,duration: 0, id: file.name })
            },
            (error: QiniuError) => {
                // 上传失败也添加一个url 避免全部上传完毕的时候条件判断失败
                urls.push({ url: "", alt: `上传失败:${error.message}`, title: "" })
                Toast.error({ content: `${file.name}上传失败:${error.message}`,duration: 2, id: file.name })
            },
            (complete: any) => {
                urls.push({url: `${OssConfig.domain}/${complete.key}${OssConfig.imgprocess}`,alt: "",title: ""})
                Toast.close(file.name)
                // 全部上传完毕 反馈到markdown上
                if (urls.length === files.length) {
                    callBack(urls)
                }
            }

        )
    })
}
/**
 * 封面上传
 * @param pops // 上传参数
 */
const mockRequest = async (pops: customRequestArgs) => {
    const { fileInstance, onSuccess, onProgress, onError } = pops;
    // 获取oss配置
    const OssConfig = await GetOssConfig()
    ossQiNiuUpLoad(
        OssConfig,
        fileInstance,
        (next: any) => {
            // 上传进度展示
            onProgress({ total: 100, loaded: next.total.percent });
        },
        (error: QiniuError) => {
            if (error instanceof QiniuRequestError) {
                onError({ status: error.code });
            } else {
                onError({ status: 500 });
            }
        },
        (complete: any) => {
            // 返回封面地址
            onSuccess(`${OssConfig.domain}/${complete.key}${OssConfig.imgprocess}`)
        }
    );
};

const ossQiNiuUpLoad = async (ossConfig: OssConfig, file: File, next: any, error: any, complete: any) => {
    // 使用文件名生成MD5
    const fileMD5 = await SparkMD5.hashBinary(file.name)
    // 获取文件扩展名
    const extension = file.name.split('.').pop();
    // 设置文件上传名
    const upPathWithName = `${ossConfig.keyprefix}${fileMD5}.${extension}`
    // 设置上传配置
    const upconfig = {
        // TODO: 配置上传区域 待完善
        region: ossConfig.region as typeof region[keyof typeof region],
    }
    // 开始上传
    const observable = qiniu.upload(file, upPathWithName, ossConfig.upToken, undefined, upconfig)
    // 订阅上传进度
    const subscription = observable.subscribe(next, error, complete);
    return subscription
}

export { markdownUpImg, mockRequest }
